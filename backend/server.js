// // const express = require('express');
// // const cors = require('cors');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const mongoose = require('mongoose');
// // const app = express();
// // const PORT = 5000;

// // // MongoDB Atlas connection string
// // const mongoURI = 'mongodb+srv://bookshelfadmin:adminbookshelf@bookshelfdb.pqi6h.mongodb.net/?retryWrites=true&w=majority&appName=bookshelfdb';

// // // Connect to MongoDB Atlas
// // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log('Connected to MongoDB Atlas'))
// //   .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// // // Define the User schema
// // const userSchema = new mongoose.Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true }
// // });

// // // Create the User model
// // const User = mongoose.model('User', userSchema);

// // // Middleware
// // app.use(cors());
// // app.use(express.json()); // For parsing JSON request bodies

// // // Signup route
// // app.post('/signup', async (req, res) => {
// //   const { email, password } = req.body;

// //   // Check if the user already exists
// //   const existingUser = await User.findOne({ email });
// //   if (existingUser) {
// //     return res.status(400).json({ error: 'User already exists' });
// //   }

// //   // Hash the password before storing
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   // Create new user in MongoDB
// //   const newUser = new User({ email, password: hashedPassword });
// //   await newUser.save();

// //   res.status(201).json({ message: 'User created' });
// // });

// // // Login route
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   // Find user by email
// //   const user = await User.findOne({ email });
// //   if (!user) {
// //     return res.status(400).json({ error: 'Invalid credentials' });
// //   }

// //   // Compare entered password with stored hash
// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) {
// //     return res.status(400).json({ error: 'Invalid credentials' });
// //   }

// //   // Create a JWT token
// //   const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

// //   res.json({ token });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const User = require("./models/User");
// const Book = require("./models/Book");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Atlas connection
// mongoose
//   .connect("your-mongodb-atlas-uri", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Routes

// // User Signup
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const newUser = new User({ email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // User Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add Book to My Bookshelf
// app.post("/books", async (req, res) => {
//   const { title, author, thumbnail, rating, review, userId } = req.body;
//   try {
//     const book = new Book({ title, author, thumbnail, rating, review, userId });
//     await book.save();
//     res.status(201).json({ message: "Book added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Get Bookshelf for a User
// app.get("/books", async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const books = await Book.find({ userId });
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Update Book Rating/Review
// app.put("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const { rating, review } = req.body;
//   try {
//     const book = await Book.findByIdAndUpdate(
//       id,
//       { rating, review },
//       { new: true }
//     );
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     res.status(200).json(book);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete a Book
// app.delete("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const book = await Book.findByIdAndDelete(id);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Book = require("./models/Book");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
