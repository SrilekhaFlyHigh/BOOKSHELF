const express = require('express');
const Book = require('../models/Book');
const { protectRoute } = require('../controllers/authController'); 

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


router.post('/add', async (req, res) => {
  const { title, author, rating, review, userId } = req.body;
  
  const newBook = new Book({ title, author, rating, review, userId });
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

module.exports = router;
