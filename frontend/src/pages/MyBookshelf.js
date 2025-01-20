
import React, { useState } from 'react';
import 'styles/mybookshelf.css'; // Add styles as needed
import 'styles/searchbooks.css';

const MyBookshelf = ({ books, onRemoveBook }) => {
  const [showRemoveMessage, setShowRemoveMessage] = useState(false);
  const [removedBookName, setRemovedBookName] = useState('');
  const [reviews, setReviews] = useState({}); // Track reviews for books
  const [ratings, setRatings] = useState({}); // Track ratings for books

  const handleRemoveBook = (index) => {
    const bookName = books[index]?.title; // Safely get the book title
    if (bookName) {
      setRemovedBookName(bookName); // Set the removed book name
      setShowRemoveMessage(true); // Show the remove success message
      onRemoveBook(index); // Call the remove function
      setTimeout(() => {
        setShowRemoveMessage(false); // Hide message after 3 seconds
        setRemovedBookName(''); // Clear the book name
      }, 10000);
    }
  };

  const handleRatingChange = (index, rating) => {
    setRatings((prev) => ({
      ...prev,
      [index]: rating,
    }));
  };

  const handleReviewChange = (index, reviewText) => {
    setReviews((prev) => ({
      ...prev,
      [index]: reviewText,
    }));
  };

  const handleRemoveReview = (index) => {
    setReviews((prev) => {
      const updatedReviews = { ...prev };
      delete updatedReviews[index];
      return updatedReviews;
    });
  };

  return (
    <div className="my-bookshelf">
      <h1>
        <center>My Collections</center>
      </h1>
      {showRemoveMessage && (
        <p className="success-message">
          The Book "<strong>{removedBookName}</strong>" has been removed successfully from your bookshelf!
        </p>
      )}
      {books.length === 0 ? (
        <p className="book-message">
          Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
          personalized favourites.
        </p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li className="book-box" key={index}>
              <div>
                <img src={book.thumbnail} alt={book.title} />
                <h3>{book.title}</h3>
                <p className="author-name">Author: {book.author}</p>
                <p className="author-name">Average Rating: {book.averageRating || 'No ratings yet'}</p>
              </div>
              <div>
                <label className="author-name">
                  Your Rating:
                  <input className='book-rating-box'
                    type="number"
                    min="1"
                    max="5"
                    value={ratings[index] || ''}
                    onChange={(e) => handleRatingChange(index, e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="author-name">
                  Your Review:
                  <textarea className='book-review'
                    value={reviews[index] || ''}
                    onChange={(e) => handleReviewChange(index, e.target.value)}
                  />
                </label>
                {reviews[index] && (
                  <button className="remove-review-button" onClick={() => handleRemoveReview(index)}>
                    Remove Review
                  </button>
                )}
              </div>
              <button className="remove-button" onClick={() => handleRemoveBook(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookshelf;




