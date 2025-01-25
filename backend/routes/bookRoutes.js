// // const express = require('express');
// // const Book = require('../models/Book');
// // const { protectRoute } = require('../controllers/authController'); 

// // const router = express.Router();

// // router.get('/all', async (req, res) => {
// //   try {
// //     const books = await Book.find();
// //     res.json(books);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to fetch books' });
// //   }
// // });


// // router.post('/add', async (req, res) => {
// //   const { title, author, rating, review, userId } = req.body;
  
// //   const newBook = new Book({ title, author, rating, review, userId });
// //   try {
// //     await newBook.save();
// //     res.status(201).json(newBook);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to add book' });
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const Book = require("../models/Book");
// const router = express.Router();
// const { authenticateToken } = require("../server"); // Import the authenticateToken function from server.js

// // Add book to bookshelf (with rating and review)
// router.post("/add", authenticateToken, async (req, res) => {
//   const { userId, title, author, bookId, rating, review } = req.body;

//   if (!userId || !title || !author || !bookId) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const newBook = new Book({ userId, title, author, bookId, rating, review });
//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (error) {
//     console.error("Error adding book:", error);
//     res.status(500).json({ error: "Failed to add book" });
//   }
// });

// // Update book's rating or review
// router.put("/update/:id", authenticateToken, async (req, res) => {
//   const { rating, review } = req.body;

//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ error: "Book not found" });

//     // Update rating and review
//     if (rating !== undefined) book.rating = rating;
//     if (review !== undefined) book.review = review;

//     const updatedBook = await book.save();
//     res.status(200).json(updatedBook);
//   } catch (error) {
//     console.error("Error updating book:", error);
//     res.status(500).json({ error: "Failed to update book" });
//   }
// });

// // Get all books for a specific user
// router.get("/user/:userId", authenticateToken, async (req, res) => {
//   try {
//     const books = await Book.find({ userId: req.params.userId });
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// });

// // Get all books in the database (for admin or public access)
// router.get("/", authenticateToken, async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ error: "Failed to fetch books" });
//   }
// });

// module.exports = router;


// bookRoutes.js
const express = require("express");
const { addBookToBookshelf, updateBook, getUserBooks, authenticateToken } = require("../controllers/bookController");
const router = express.Router();

router.post("/", authenticateToken, addBookToBookshelf);
router.put("/:bookId", authenticateToken, updateBook);
router.get("/user/:userId", authenticateToken, getUserBooks);// Added some

module.exports = router;

