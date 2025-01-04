
import React, { useState } from 'react';
import SearchBooks from '../pages/SearchBooks';
import BookCard from '../components/BookCard';
import axios from 'axios';
import 'styles/mybookshelf.css';

const MyBookshelf = () => {
  const [books, setBooks] = useState([]);

  // Function to add a book to the bookshelf
  const addBookToBookshelf = async (book) => {
    try {
      // Retrieve token from localStorage or another storage location
      const token = localStorage.getItem('token');

      if (!token) {
        alert('User is not authenticated. Please log in.');
        return;
      }

      // Save the book to the backend
      const response = await axios.post(
        'http://localhost:5000/api/my-bookshelf',
        book,
        {
          headers: {
            Authorization: `Bearer ${'token'}`,
          },
        }
      );

      console.log('Book added to server:', response.data);

      // Update the state to include the new book
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error('Error adding book to bookshelf:', error);
      alert('Failed to add the book. Please check your login status or try again.');
    }
  };

  return (
    <div className="search-text book-search">
      <h1>My Bookshelf</h1>

      {/* Pass the function as a prop to SearchBooks */}
      <SearchBooks addBookToBookshelf={addBookToBookshelf} />

      {/* Render the list of books */}
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        ) : (
          <p>No books in your bookshelf.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookshelf;
