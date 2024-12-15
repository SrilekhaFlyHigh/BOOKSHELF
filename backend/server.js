const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");  // Assuming you're using node-fetch for the API request
const Book = require("./models/Book");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app (build folder)
app.use(express.static(path.join(__dirname, 'build')));

// MongoDB Atlas connection
mongoose
  .connect("mongodb+srv://bookshelfadmin:adminbookshelf@bookshelfdb.pqi6h.mongodb.net/?retryWrites=true&w=majority&appName=bookshelfdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes

// Search Books using a third-party API
app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    const books = data.items.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", "),
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      rating: item.volumeInfo.averageRating || 0,
    }));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a book to the bookshelf
app.post("/books", async (req, res) => {
  const { title, author, thumbnail, rating, review } = req.body;
  try {
    const book = new Book({ title, author, thumbnail, rating, review });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to add the book" });
  }
});

// Get all books in the bookshelf
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Update book review/rating
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { rating, review },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
});

// Catch-all handler to serve index.html for any route (for React app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
