
import React, { useState, useEffect } from 'react';
import 'styles/mybookshelf.css'; // Add styles as needed
import 'styles/searchbooks.css'; // Added some 

const MyBookshelf = ({ books, onRemoveBook }) => {
  const [showRemoveMessage, setShowRemoveMessage] = useState(false);
  const [removedBookName, setRemovedBookName] = useState('');
  const [reviews, setReviews] = useState({}); // Track reviews for books
  const [ratings, setRatings] = useState({}); // Track ratings for books 
  const [myBooks, setMyBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");  // State for success message
  const [isEditing, setIsEditing] = useState({}); // Track which book is being edited

  

  const showCollection = async () => {
    try {
      const userId = localStorage.getItem("userId") || ""
      const token = localStorage.getItem("token");
      //const response = await fetch(`http://localhost:5000/api/books/user/${userId}`, {
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
          'Content-Type': 'application/json',
        },
    
      });
      const data = await response?.json()
      if (!response.ok) {
        throw new Error('Failed to save review');
      }
      setMyBooks(data?.books)
      console.log('Your collection!', data);
    } catch (error) {
      console.error('Error in displaying collection:', error);
    }
  };
   useEffect(() => {
    showCollection()
     }, []);//for now

  // const showCollection = async () => {
  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve token from localStorage
  //     const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  
  //     if (!token) {
  //       throw new Error("No token found. Please log in again.");
  //     }
  
  //     const response = await fetch(`http://localhost:5000/api/books/user/${userId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Include token in Authorization header
  //       },
  //     });
  
  //     const data = await response.json();
  
  //     if (!response.ok) {
  //       console.error("Fetched data: ", data);
  //       throw new Error(data.message || "Failed to fetch books");
  //     }
  
  //     console.log("Fetched data: ", data);
  //     // Handle the fetched data (e.g., update state or UI)
  //   } catch (error) {
  //     console.error("Error in fetching collection:", error);
  //   }
  // };
  

  // Save review to the database
  const saveReviewToDB = async (bookId, review, index) => {
    try {
      console.log("Sending Review:", { bookId, review });
      //const response = await fetch(`http://localhost:5000/api/books/review/${bookId}`, {
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/review/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),        
      });
      console.log("Review response", response);
      console.log("review", review);
  
      if (!response.ok) {
        throw new Error('Failed to save review');
      }  
      const data = await response.json();
      console.log("Saved data", data);
      // ✅ Update success message for only this book
      setSuccessMessage((prev) => ({
      ...prev,
      [index]: "Review saved successfully!",
    }));

    // Hide message after 3 seconds
    setTimeout(() => {
      setSuccessMessage((prev) => ({
        ...prev,
        [index]: "", // Clear message
      }));
    }, 3000);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };
  
  

  // Save rating to the database
  // const saveRatingToDB = async (bookId, rating) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     //const response = await fetch(`http://localhost:5000/api/books/${bookId}/rating`, {
  //       const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/${bookId}/rating`, {
  //       method: 'PUT',
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Include token in header
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ rating }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save rating');
  //     }
  //     console.log('Rating saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving rating:', error);
  //   }
  // };

  // Remove review from the database
  const removeReviewFromDB = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      //const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/${bookId}/review`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove review');
      }
      console.log('Review removed successfully!');
    } catch (error) {
      console.error('Error removing review:', error);
    }
  };

  //Remove book from db and from collection working fine dont remove
  const handleRemoveBook = async (index) => {
    try {
      const userId = localStorage.getItem('userId') || "" ; // Retrieve the userId from storage or state
      console.log('UserId:', userId);
      const bookTitle = myBooks[index]?.title; // Assuming the book's title is unique
      console.log('Book Title:', bookTitle); 
  
      if (!userId || !bookTitle) {
        console.error('Missing userId or bookTitle');
        return;
      }
  
      //const response = await fetch(`http://localhost:5000/api/books`, {
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ userId, title: bookTitle }), // Send userId and book identifier
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete book: ${response.statusText}`);
      }
  
      console.log('Book removed successfully!');
      setRemovedBookName(bookTitle); // Set the book name to display in the success message
      setShowRemoveMessage(true); // Show the success message
      setMyBooks((prevBooks) => prevBooks.filter((_, i) => i !== index)); // Update state
  
      setTimeout(() => {
        setShowRemoveMessage(false); // Hide the message after 5 seconds
      }, 5000);
      //setMyBooks((prevBooks) => prevBooks.filter((_, i) => i !== index)); // Update state
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };
  
  /**from here the reviews and ratings start */

  const handleRatingChange = (index, rating) => {
    const bookId = myBooks[index]?._id; // Assuming each book has a unique `_id`
    console.log('Book ID:', bookId);
    setRatings((prev) => ({
      ...prev,
      [index]: rating,
    }));
    //if (bookId) saveRatingToDB(bookId, rating); // Save to DB
  };

  const handleReviewChange = (index, review) => {
    const bookId = myBooks[index]?._id; // Assuming each book has a unique `_id`
    console.log("Book ID:", bookId, "Review:", review);

    setReviews((prev) => ({
      ...prev,
      [index]: review,
    }));
    //if (bookId) saveReviewToDB(bookId, review, index); // Save to DB

     // Toggle edit mode when review is being written
    setIsEditing((prev) => ({
    ...prev,
    [index]: true, // Change button text to Save Changes
    }));
  };

  const handleRemoveReview = (index) => {
    const bookId = books[index]?._id; // Assuming each book has a unique `_id`
    setReviews((prev) => {
      const updatedReviews = { ...prev };
      delete updatedReviews[index];
      return updatedReviews;
    });
    if (bookId) removeReviewFromDB(bookId); // Remove from DB
  };//removing review is working fine from frontend

  const handleEditToggle = (index) => {
    setIsEditing((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle edit mode for the specific book
    }));
  };

  const handleSaveChanges = async (index) => {
    const bookId = myBooks[index]?._id;
    const review = reviews[index];
  
    if (!bookId || !review.trim()) return; // Prevent empty review submission
  
    try {
      console.log("Saving Review:", { bookId, review });
      //console.log("Sending request to:", `https://bookshelf-lp8f.onrender.com/api/books/review/${bookId}`);
            //const response = await fetch(`http://localhost:5000/api/books/review/${bookId}`, {
            const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/review/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save review');
      }
  
      const data = await response.json();
      console.log("Review saved:", data);
  
      // ✅ Show success message only for this book
      setSuccessMessage((prev) => ({
        ...prev,
        [index]: "Review saved successfully!",
      }));
  
      // ✅ Hide message after 3 seconds
      setTimeout(() => {
        setSuccessMessage((prev) => ({
          ...prev,
          [index]: "", // Clear message
        }));
      }, 3000);

      setIsEditing((prev) => ({
        ...prev,
        [index]: false, // Set to false to show "Add Review" button again
      }));
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div className="my-bookshelf mybookshelf-image">
      <h1 className='mycollections-text'>
        <center>My Collections</center>        
      </h1>
      <p className='feel-free'>Please click on <b>"Add Reviews"</b> button to enter your reviews & ratings and click on <b>"Save Changes"</b></p>
      {showRemoveMessage && (
        <p className="success-message">
          The Book "<strong>{removedBookName}</strong>" has been removed successfully from your bookshelf!
        </p>
      )}
      {myBooks.length === 0 ? (
        <p className="book-message">
          Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
          personalized favourites.          
        </p>
      ) : (
        <ul>
          {myBooks.map((book, index) => (
            <li className="book-box" key={book._id || index}>
              <div>
                <img src={book.thumbnail} alt={book.title} />
                <h3>{book.title}</h3>
                <p className="author-name">Author: {book.author}</p>
                <p className="author-name">Average Rating: {book.averageRating || 'No ratings yet'}</p>
              </div>
              <div>
                <label className="author-name">
                  Your Rating:
                  <input
                    className="book-rating-box"
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
                  <textarea
                    className="book-review"
                    value={reviews[index] || ''}
                    onChange={(e) => handleReviewChange(index, e.target.value)}
                  />                  
                </label>
                {successMessage[index] && <p className="success-message">{successMessage[index]}</p>}
                {reviews[index] && (
                  <button className="remove-review-button" onClick={() => handleRemoveReview(index)}>
                    Remove Review
                  </button>
                )}
              </div>
              <button className="remove-button" onClick={() => handleRemoveBook(index)}>
                Remove Book
              </button>
              {isEditing[index] ? (
                  <button className="save-button" onClick={() => handleSaveChanges(index)}>
                            Save Changes
                  </button>
                  ) : (
                  <button className="edit-button" onClick={() => handleEditToggle(index)}>
                      Add Review
                  </button>
                  )}  
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookshelf;







