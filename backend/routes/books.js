const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Add book to bookshelf (with rating and review)
router.post('/add', async (req, res) => {
  const { userId, title, author, thumbnail, averageRating, review } = req.body;
  try {
    const newBook = new Book({ userId, title, author, thumbnail, averageRating, review });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book's rating or review
router.put('/update/:id', async (req, res) => {
  const { rating, review } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Update rating and review
    book.rating = rating || book.rating;
    book.review = review || book.review;

    // Optionally calculate the new average rating (simplified here)
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all books for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;// Added some
