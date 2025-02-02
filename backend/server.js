const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require("path");

const User = require("./models/User");
const Book = require("./models/Book");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

console.log("JWT_SECRET in server.js:", process.env.JWT_SECRET);
console.log("MONGO_URI in server.js:", process.env.MONGO_URI);

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://bookshelf-front-d01n.onrender.com'],  // Frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/books",  bookRoutes);
app.use("/api/auth", authRoutes);

// Serve static files from the React frontend build folder (uncomment if needed)
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://bookshelfadmin:adminbookshelf@bookshelfdb.pqi6h.mongodb.net/?retryWrites=true&w=majority&appName=bookshelfdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Authentication middleware
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Ensure the token is in the correct format
  console.log('Token received:', token); // Debugging line

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};



// API routes
app.get("/api/books", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query parameter is required" });

  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query,
        key: GOOGLE_BOOKS_API_KEY,
      },
    });

    if (response.data.items) {
      const books = response.data.items.map((item) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        averageRating: item.volumeInfo.averageRating || "N/A",
      }));
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found" });
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully. Please log in now!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Login route
// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("JWT_SECRET in login route:", process.env.JWT_SECRET);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


// Add a book to a user's bookshelf
app.post("/api/books", authenticateToken, async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from headers

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret key
    const userId = decoded.userId;

    // Create new book instance
    const newBook = new Book({
      title: req.body.title,
      authors: req.body.authors,
      thumbnail: req.body.thumbnail,
      rating: req.body.rating,
      userId: userId, // Attach userId to the book to link it to the current user
    });

    // Save the book to the database
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the book' });
  }
});

//Delete a book from user's bookshelf
app.delete('/api/books', async (req, res) => {
  const { userId, title } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ message: 'Missing userId or bookTitle' });
  }

  try {
    const result = await Book.findOneAndDelete({ userId, title});
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});




// Save book rating
app.post("/api/books/:bookId/rating", authenticateToken, async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (rating !== undefined) book.rating = rating;
    if (review !== undefined) book.review = review;

    await book.save();
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Save book review
app.put("/api/books/review/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const { review } = req.body;
  
  if (!bookId || !review) {
    return res.status(400).json({ message: "Book ID and review are required" });
  }

  try {
     // Convert bookId to ObjectId
     if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    // Find the book by ID
    console.log("BookId received:", bookId);
    console.log("Request Body:", req.body);
    const book = await Book.findById(bookId);
    console.log("Book", book);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Update the `review` field  
    book.review = review;


    // Save the updated book document
    await book.save();

    res.status(200).json({ message: 'Review saved successfully', book });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Failed to save review' });
  }
});

// Save book rating
// PUT endpoint for updating book rating
// app.put('/api/books/:bookId', authenticateToken, async (req, res) => {
//   try {
//     const { rating } = req.body; // Extract the new rating from the request body
//     const bookId = req.params.id;

//     const updatedBook = await Book.findByIdAndUpdate(
//       bookId,
//       { rating: rating }, // Update the rating field
//       { new: true } // Return the updated book
//     );

//     if (!updatedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json({ book: updatedBook });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating rating", error }); 
//   }
// });

// Delete book review
app.delete('/api/books/:id/review', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $unset: { review: "" } },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error removing review' });
  }
});

// Get books for a specific user
app.get("/api/books/user/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const books = await Book.find({ userId });
    res.json(books);
  } catch (error) {
    console.error("Error fetching user books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});//dont move 
