
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { userId, book } = req.body;
  
  const newBook = new Book({ userId, ...book });
  await newBook.save();

  res.status(201).json({ message: 'Book added to bookshelf' });
};