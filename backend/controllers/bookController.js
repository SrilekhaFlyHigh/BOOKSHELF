
// // // const Book = require('../models/Book');

// // // const addBook = async (req, res) => {
// // //   const { userId, title, author, thumbnail, rating, review } = req.body;

// // //   if (!userId || !title) {
// // //     return res.status(400).json({ error: 'userId and title are required.' });
// // //   }

// // //   try {
// // //     const book = new Book({
// // //       userId,
// // //       title,
// // //       author,
// // //       thumbnail,
// // //       rating,
// // //       review,
// // //     });
// // //     await book.save();
// // //     res.status(201).json(book);
// // //   } catch (error) {
// // //     console.error('Error saving book:', error.message);
// // //     res.status(500).json({ error: 'Failed to add book.' });
// // //   }
// // // };

// // // const getBooksByUser = async (req, res) => {
// // //   const { userId } = req.params;

// // //   try {
// // //     const books = await Book.find({ userId });
// // //     res.status(200).json(books);
// // //   } catch (error) {
// // //     console.error('Error fetching books:', error.message);
// // //     res.status(500).json({ error: 'Failed to fetch books.' });
// // //   }
// // // };

// // // module.exports = { addBook, getBooksByUser };


// // const Book = require("../models/Book");
// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");

// // // Utility function to authenticate JWT
// // const authenticateToken = (req, res, next) => {
// //   const token = req.header("Authorization")?.split(" ")[1];  // Extract token from header
// //   if (!token) {
// //     return res.status(401).json({ message: "Authorization denied. No token provided." });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded.user;  // Attach decoded user to request
// //     next();  // Proceed to next middleware or route
// //   } catch (err) {
// //     res.status(401).json({ message: "Token is invalid." });
// //   }
// // };

// // // Add a book to a user's bookshelf
// // const addBookToBookshelf = async (req, res) => {
// //   const { title, author } = req.body;
// //   const { userId } = req.params;

// //   if (!title || !author) {
// //     return res.status(400).json({ message: "Title and author are required." });
// //   }

// //   try {
// //     const newBook = new Book({
// //       userId,
// //       title,
// //       author,
// //     });

// //     await newBook.save();
// //     res.status(201).json({ message: "Book added successfully", book: newBook });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // Update a book's rating and review
// // const updateBook = async (req, res) => {
// //   const { bookId } = req.params;
// //   const { rating, review } = req.body;

// //   try {
// //     const book = await Book.findById(bookId);
// //     if (!book) {
// //       return res.status(404).json({ message: "Book not found" });
// //     }

// //     if (rating !== undefined) book.rating = rating;
// //     if (review) book.review = review;

// //     await book.save();
// //     res.status(200).json({ message: "Book updated successfully", book });
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // Get all books for a specific user
// // const getUserBooks = async (req, res) => {
// //     console.log("Fetching books for user:", req.params.userId);  // Debug log
// //     try {
// //       const books = await Book.find({ userId: req.params.userId });
// //       if (books.length === 0) {
// //         return res.status(404).json({ message: "No books found for this user" });
// //       }
// //       res.status(200).json({ books });
// //     } catch (err) {
// //       res.status(500).json({ message: "Server error" });
// //     }
// // };

// // module.exports = {
// //   authenticateToken,
// //   addBookToBookshelf,
// //   updateBook,
// //   getUserBooks,
// // };

// const Book = require("../models/Book");
// const jwt = require("jsonwebtoken");

// // Utility function to authenticate JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];  // Extract token from header
//   if (!token) {
//     return res.status(401).json({ message: "Authorization denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;  // Attach decoded user to request
//     next();  // Proceed to next middleware or route
//   } catch (err) {
//     res.status(401).json({ message: "Token is invalid." });
//   }
// };

// // Add a book to a user's bookshelf
// const addBookToBookshelf = async (req, res) => {
//   const { title, author } = req.body;
//   const { userId } = req.params;

//   if (!title || !author) {
//     return res.status(400).json({ message: "Title and author are required." });
//   }

//   try {
//     // Create new book document in MongoDB with the userId, title, and author
//     const newBook = new Book({
//       userId,
//       title,
//       author,
//       thumbnail,
//       rating,
//       review
//     });

//     await newBook.save();  // Save the book to MongoDB
//     res.status(201).json({ message: "Book added successfully", book: newBook });
//   } catch (err) {
//     console.error("Error adding book:", err);
//     res.status(500).json({ message: "Server error while adding book" });
//   }
// };

// // Update a book's rating and review
// const updateBook = async (req, res) => {
//   const { bookId } = req.params;
//   const { rating, review } = req.body;

//   try {
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     if (rating !== undefined) book.rating = rating;
//     if (review) book.review = review;

//     await book.save();  // Save the updated book to MongoDB
//     res.status(200).json({ message: "Book updated successfully", book });
//   } catch (err) {
//     console.error("Error updating book:", err);
//     res.status(500).json({ message: "Server error while updating book" });
//   }
// };

// // Get all books for a specific user
// const getUserBooks = async (req, res) => {
//   console.log("Fetching books for user:", req.params.userId);  // Debug log

//   try {
//     // Find books for the user using userId
//     const books = await Book.find({ userId: req.params.userId });
//     if (books.length === 0) {
//       return res.status(404).json({ message: "No books found for this user" });
//     }
//     res.status(200).json({ books });
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     res.status(500).json({ message: "Server error while fetching books" });
//   }
// };

// module.exports = {
//   authenticateToken,
//   addBookToBookshelf,
//   updateBook,
//   getUserBooks,
// };

const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const express = require('express');
const JWT_SECRET='your-secret-key';

// Utility function to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
  //const token = req.headers.authorization;
  //console.log(req.headers)
  console.log('Received token:', token);
  
  if (!token) {
    return res.status(401).json({ message: "Authorization denied. No token provided." });
  }

  try {
    console.log('checking decoded',process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded; // Attach decoded user to request
    next(); // Proceed to next middleware or route
  } catch (err) {
    console.log('error',err)
    res.status(401).json({ message: "Token is invalid." });
  }
};

// Add a book to a user's bookshelf
const addBookToBookshelf = async (req, res) => {
  const { title, author, thumbnail, rating, review } = req.body;
  const userId = req.user.userId;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  try {
    const newBook = new Book({
      userId,
      title,
      author,
      thumbnail,
      rating,
      review,
    });

    await newBook.save(); // Save the book to MongoDB
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Server error while adding book" });
  }
};

// Update a book's rating and review
const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (rating !== undefined) book.rating = rating;
    if (review !== undefined) book.review = review;

    await book.save(); // Save the updated book to MongoDB
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error while updating book" });
  }
};

// Get all books for a specific user
const getUserBooks = async (req, res) => {
  const userId = req.params.userId;

  try {
    const books = await Book.find({ userId });
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found for this user" });
    }
    res.status(200).json({ books });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error while fetching books" });
  }
};

module.exports = {
  authenticateToken,
  addBookToBookshelf,
  updateBook,
  getUserBooks,
};