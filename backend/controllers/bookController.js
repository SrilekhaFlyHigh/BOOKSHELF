
const Book = require('../models/Book');

const addBook = async (req, res) => {
  const { userId, title, author, thumbnail, rating, review } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required.' });
  }

  try {
    const book = new Book({
      userId,
      title,
      author,
      thumbnail,
      rating,
      review,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error saving book:', error.message);
    res.status(500).json({ error: 'Failed to add book.' });
  }
};

const getBooksByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const books = await Book.find({ userId });
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
};

module.exports = { addBook, getBooksByUser };
