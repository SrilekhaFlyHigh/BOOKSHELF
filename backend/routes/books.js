const express = require('express');
const Book = require('../models/Book');

const router = express.Router();


router.post('/add', async (req, res) => {
  const { title, author, thumbnail, averageRating } = req.body;
  try {
    const newBook = new Book({ title, author, thumbnail, averageRating });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
