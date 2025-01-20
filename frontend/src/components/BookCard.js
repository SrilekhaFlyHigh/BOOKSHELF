// // src/components/BookCard.js
import React, { useState } from 'react';

const BookCard = ({ book, onAddReview, onUpdateRating }) => {
  const [review, setReview] = useState(book.review || '');
  const [rating, setRating] = useState(book.rating || 0);

  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleReviewSubmit = () => onAddReview(review);
  const handleRatingSubmit = () => onUpdateRating(rating);

  return (
    <div className="book-card">
      <img src={book.thumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Rating: {book.rating}</p>
      <p>{book.averageRating}</p>

      <div>
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Add a review"
        ></textarea>
        <button onClick={handleReviewSubmit}>Save Review</button>
      </div>

      <div>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="1"
          max="5"
        />
        <button onClick={handleRatingSubmit}>Update Rating</button>
      </div>
    </div>
  );
};

export default BookCard;
