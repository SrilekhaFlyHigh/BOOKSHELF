import React, { useState } from 'react';
import axios from 'axios';
import 'styles/searchbooks.css';
import 'styles/mybookshelf.css';

const SearchBooks = ({ addBookToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = "AIzaSyDSQylmKgyAyg4ahgBu4-Rw50atRUONZ4M";

  const searchBooks = async () => {
    if (!query) return; // Avoid unnecessary API calls
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${API_KEY}`
      );
      setResults(response.data.items || []);
      setError(null);
    } catch (err) {
      console.error("Error searching books:", err);
      if (err.response?.status === 429) {
        setError("Too many requests. Please try again later.");
      } else {
        setError("An error occurred while searching for books.");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks();
  };


  // const handleSearch = async () => {
  //   if (query.trim()) {
  //     try {
  //       const response = await axios.get(
  //         `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${API_KEY}`
  //       );
  //       setResults(response.data.items || []);
  //     } catch (err) {
  //       setError('Error fetching books');
  //       console.error(err);
  //     }
  //   }
  // };

  
  console.log("addBookToBookshelf in SearchBooks:", addBookToBookshelf);

  return (
    <div className="book-search search-text">
      <h3>Please type book name and search here...</h3>
      <input className='search-input'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      
      <button className='search-button' onClick={handleSearch}>Search</button>
      
      {error && <p>{error}</p>}

      <div className="search-results">
        {results.length > 0 ? (
          results.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg'}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
              
              <button onClick={() => addBookToBookshelf({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
                image: book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg',
                id: book.id
              })}>
                Add to Bookshelf
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks; 