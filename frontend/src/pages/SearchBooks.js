import React, { useState } from 'react';
import axios from 'axios';
import 'styles/searchbooks.css';

const SearchBooks = ({ addBookToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
        );
        setResults(response.data.items || []);
      } catch (err) {
        setError('Error fetching books');
        console.error(err);
      }
    }
  };

  
  console.log("addBookToBookshelf in SearchBooks:", addBookToBookshelf);

  return (
    <div className="search-books searchbox">
      <h3>Please type book name and search here...</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
      />
      
      <button onClick={handleSearch}>Search</button>
      
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
              
              <button onClick={() => addBookToBookshelf(book)}>
                Add to Bookshelf
              </button>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;

