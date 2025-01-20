const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");

const User = require("./models/User");
const Book = require("./models/Book");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
//const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

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

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Access Denied");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    next();
  });
}

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully. Please log in now!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Login Route
// Login Route
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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


// Route: Search books using Google Books API
app.get("/api/books/search-books", async (req, res) => {
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

// Route: Add a book to the bookshelf
app.post("/api/my-bookshelf/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (userId !== req.user.userId) {
    return res.status(403).send("You can only add books to your own bookshelf");
  }

  try {
    const { bookId, title, author, rating, review } = req.body;

    const newBook = new Book({
      userId,
      bookId,
      title,
      author,
      rating,
      review,
    });

    await newBook.save();
    res.status(201).send("Book added to your bookshelf");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Error adding book");
  }
});

// Route: Update book rating or review
app.put("/api/my-bookshelf/:bookId", authenticateToken, async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (rating !== undefined) book.rating = rating;
    if (review !== undefined) book.review = review;

    await book.save();
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Route: Get user-specific books
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
