const express = require('express');
const Book = require('../models/Book');
const { protectRoute } = require('../controllers/authController'); 

const router = express.Router();


router.post('/', protectRoute, async (req, res) => {
  const { book } = req.body;

  try {
    
    const newBook = new Book({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
      thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
      averageRating: book.volumeInfo.averageRating || 'No Rating',
      user: req.user._id,
    });

    await newBook.save();
    res.status(201).json(newBook); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', protectRoute, async (req, res) => {
  try {
    
    const books = await Book.find({ user: req.user._id });
    res.json(books); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
