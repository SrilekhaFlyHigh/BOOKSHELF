
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require('./models/User');
const Book = require('./models/Book')
const app = express();
const axios = require('axios');

const JWT_SECRET = "your_jwt_secret_key";
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

require('dotenv').config();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
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

  const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    thumbnail: String,
    rating: Number,
    review: String,
  });
  
  const Book = mongoose.model("Book", bookSchema);
  
  // Bookshelf Route
  app.get("/api/my-bookshelf", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching bookshelf:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Mock database
const books = []; // Replace this with actual database logic if needed

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, unauthorized.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token, access denied.' });
    }
    req.user = user;
    next();
  });
};

// Route: Add a book to the bookshelf
app.post('/api/bookshelf', authenticateToken, (req, res) => {
  const { title, author, description, thumbnail } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    description: description || 'No description provided',
    thumbnail: thumbnail || '',
    user: req.user.email, // Associating the book with the user who added it
  };

  // Save the book to the database
  const book = new Book(newBook);
  book.save()
    .then(savedBook => res.status(201).json(savedBook))
    .catch(err => res.status(500).json({ message: "Failed to add book", error: err }));
});


// Route: Get books for the authenticated user
app.get('/api/bookshelf', authenticateToken, (req, res) => {
  Book.find({ user: req.user.email })
    .then(userBooks => res.status(200).json(userBooks))
    .catch(err => res.status(500).json({ message: "Failed to fetch books", error: err }));
});

  

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    // Send success response with message
    return res.status(201).json({ message: "User registered successfully. Please log in now!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Login Route (POST /login)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {
    expiresIn: "1h",
  });

  res.status(200).json({
    message: "Login successful",
    token,
  });
});


// Middleware to authenticate token
const authenticateBookToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, unauthorized.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token, access denied.' });
    }
    req.user = user; // Store user information from the token in the request
    console.log("User authenticated:", user); // Debugging log
    next();
  });
};

// Define the search-books route
app.get('/api/books/search-books', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        key: apiKey,
      },
    });

    if (response.data.items) {
      const books = response.data.items.map(item => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        averageRating: item.volumeInfo.averageRating || 'N/A',
      }));

      res.json(books);
    } else {
      res.status(404).json({ error: 'No books found' });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Add book to user's bookshelf
app.post('/api/my-bookshelf', authenticateBookToken, async (req, res) => {
  const { title, author, description, thumbnail } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  // Log the user to check if it's set correctly
  console.log("Authenticated user: ", req.user);

  // Create a new book and associate it with the authenticated user
  try {
    const newBook = new Book({
      userId: req.user.userId, // Ensure you're using the correct user ID from the JWT payload
      title,
      author,
      description: description || 'No description provided',
      thumbnail: thumbnail || '',
    });

    await newBook.save();

    res.status(201).json(newBook); // Return the newly added book
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: 'Failed to add the book. Please check your login status or try again.' });
  }
});


// Update book rating or review
app.put('/api/bookshelf/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (rating !== undefined) {
      book.rating = rating;
    }
    if (review !== undefined) {
      book.review = review;
    }

    await book.save();
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});



// Protected route example
app.get("/api/user", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ user });
});

app.listen(5000, () => console.log("Server is running on http://localhost:5000"))
