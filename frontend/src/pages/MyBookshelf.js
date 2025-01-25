// // //not fit
// // // import React, { useState } from 'react';
// // // import 'styles/mybookshelf.css'; // Add styles as needed
// // // import 'styles/searchbooks.css';

// // // const MyBookshelf = ({ books, onRemoveBook }) => {
// // //   const [showRemoveMessage, setShowRemoveMessage] = useState(false);
// // //   const [removedBookName, setRemovedBookName] = useState('');
// // //   const [reviews, setReviews] = useState({}); // Track reviews for books
// // //   const [ratings, setRatings] = useState({}); // Track ratings for books

// // //   const handleRemoveBook = (index) => {
// // //     const bookName = books[index]?.title; // Safely get the book title
// // //     if (bookName) {
// // //       setRemovedBookName(bookName); // Set the removed book name
// // //       setShowRemoveMessage(true); // Show the remove success message
// // //       onRemoveBook(index); // Call the remove function
// // //       setTimeout(() => {
// // //         setShowRemoveMessage(false); // Hide message after 3 seconds
// // //         setRemovedBookName(''); // Clear the book name
// // //       }, 10000);
// // //     }
// // //   };

// // //   const handleRatingChange = (index, rating) => {
// // //     setRatings((prev) => ({
// // //       ...prev,
// // //       [index]: rating,
// // //     }));
// // //   };

// // //   const handleReviewChange = (index, reviewText) => {
// // //     setReviews((prev) => ({
// // //       ...prev,
// // //       [index]: reviewText,
// // //     }));
// // //   };

// // //   const handleRemoveReview = (index) => {
// // //     setReviews((prev) => {
// // //       const updatedReviews = { ...prev };
// // //       delete updatedReviews[index];
// // //       return updatedReviews;
// // //     });
// // //   };

// // //   return (
// // //     <div className="my-bookshelf">
// // //       <h1>
// // //         <center>My Collections</center>
// // //       </h1>
// // //       {showRemoveMessage && (
// // //         <p className="success-message">
// // //           The Book "<strong>{removedBookName}</strong>" has been removed successfully from your bookshelf!
// // //         </p>
// // //       )}
// // //       {books.length === 0 ? (
// // //         <p className="book-message">
// // //           Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
// // //           personalized favourites.
// // //         </p>
// // //       ) : (
// // //         <ul>
// // //           {books.map((book, index) => (
// // //             <li className="book-box" key={index}>
// // //               <div>
// // //                 <img src={book.thumbnail} alt={book.title} />
// // //                 <h3>{book.title}</h3>
// // //                 <p className="author-name">Author: {book.author}</p>
// // //                 <p className="author-name">Average Rating: {book.averageRating || 'No ratings yet'}</p>
// // //               </div>
// // //               <div>
// // //                 <label className="author-name">
// // //                   Your Rating:
// // //                   <input className='book-rating-box'
// // //                     type="number"
// // //                     min="1"
// // //                     max="5"
// // //                     value={ratings[index] || ''}
// // //                     onChange={(e) => handleRatingChange(index, e.target.value)}
// // //                   />
// // //                 </label>
// // //               </div>
// // //               <div>
// // //                 <label className="author-name">
// // //                   Your Review:
// // //                   <textarea className='book-review'
// // //                     value={reviews[index] || ''}
// // //                     onChange={(e) => handleReviewChange(index, e.target.value)}
// // //                   />
// // //                 </label>
// // //                 {reviews[index] && (
// // //                   <button className="remove-review-button" onClick={() => handleRemoveReview(index)}>
// // //                     Remove Review
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <button className="remove-button" onClick={() => handleRemoveBook(index)}>
// // //                 Remove
// // //               </button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MyBookshelf;



// // //this is not co opearting with UI from searchbooks
// // import React, { useState } from 'react';
// // import 'styles/mybookshelf.css'; // Add styles as needed
// // import 'styles/searchbooks.css';

// // const MyBookshelf = ({ books, onRemoveBook }) => {
// //   const [showRemoveMessage, setShowRemoveMessage] = useState(false);
// //   const [removedBookName, setRemovedBookName] = useState('');
// //   const [reviews, setReviews] = useState({}); // Track reviews for books
// //   const [ratings, setRatings] = useState({}); // Track ratings for books

  
// //   // Save review to the database
// //   const saveReviewToDB = async (bookId, reviewText) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ review: reviewText }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to save review');
// //       }
// //       console.log('Review saved successfully!');
// //     } catch (error) {
// //       console.error('Error saving review:', error);
// //     }
// //   };

// //   // Save rating to the database
// //   const saveRatingToDB = async (bookId, rating) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/books/${bookId}/rating`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ rating }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to save rating');
// //       }
// //       console.log('Rating saved successfully!');
// //     } catch (error) {
// //       console.error('Error saving rating:', error);
// //     }
// //   };

// //   // Remove review from the database
// //   const removeReviewFromDB = async (bookId) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
// //         method: 'DELETE',
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to remove review');
// //       }
// //       console.log('Review removed successfully!');
// //     } catch (error) {
// //       console.error('Error removing review:', error);
// //     }
// //   };

// //   const handleRemoveBook = (index) => {
// //     const bookName = books[index]?.title; // Safely get the book title
// //     if (bookName) {
// //       setRemovedBookName(bookName); // Set the removed book name
// //       setShowRemoveMessage(true); // Show the remove success message
// //       onRemoveBook(index); // Call the remove function
// //       setTimeout(() => {
// //         setShowRemoveMessage(false); // Hide message after 3 seconds
// //         setRemovedBookName(''); // Clear the book name
// //       }, 10000);
// //     }
// //   };

// //   const handleRatingChange = (index, rating) => {
// //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// //     setRatings((prev) => ({
// //       ...prev,
// //       [index]: rating,
// //     }));
// //     if (bookId) saveRatingToDB(bookId, rating); // Save to DB
// //   };

// //   const handleReviewChange = (index, reviewText) => {
// //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// //     setReviews((prev) => ({
// //       ...prev,
// //       [index]: reviewText,
// //     }));
// //     if (bookId) saveReviewToDB(bookId, reviewText); // Save to DB
// //   };

// //   const handleRemoveReview = (index) => {
// //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// //     setReviews((prev) => {
// //       const updatedReviews = { ...prev };
// //       delete updatedReviews[index];
// //       return updatedReviews;
// //     });
// //     if (bookId) removeReviewFromDB(bookId); // Remove from DB
// //   };

// //   return (
// //     <div className="my-bookshelf">
// //       <h1>
// //         <center>My Collections</center>
// //       </h1>
// //       {showRemoveMessage && (
// //         <p className="success-message">
// //           The Book "<strong>{removedBookName}</strong>" has been removed successfully from your bookshelf!
// //         </p>
// //       )}
// //       {books.length === 0 ? (
// //         <p className="book-message">
// //           Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
// //           personalized favourites.
// //         </p>
// //       ) : (
// //         <ul>
// //           {books.map((book, index) => (
// //             <li className="book-box" key={index}>
// //               <div>
// //                 <img src={book.thumbnail} alt={book.title} />
// //                 <h3>{book.title}</h3>
// //                 <p className="author-name">Author: {book.author}</p>
// //                 <p className="author-name">Average Rating: {book.averageRating || 'No ratings yet'}</p>
// //               </div>
// //               <div>
// //                 <label className="author-name">
// //                   Your Rating:
// //                   <input
// //                     className="book-rating-box"
// //                     type="number"
// //                     min="1"
// //                     max="5"
// //                     value={ratings[index] || ''}
// //                     onChange={(e) => handleRatingChange(index, e.target.value)}
// //                   />
// //                 </label>
// //               </div> 
// //               <div>
// //                 <label className="author-name">
// //                   Your Review:
// //                   <textarea
// //                     className="book-review"
// //                     value={reviews[index] || ''}
// //                     onChange={(e) => handleReviewChange(index, e.target.value)}
// //                   />
// //                 </label>
// //                 {reviews[index] && (
// //                   <button className="remove-review-button" onClick={() => handleRemoveReview(index)}>
// //                     Remove Review
// //                   </button>
// //                 )}
// //               </div>
// //               <button className="remove-button" onClick={() => handleRemoveBook(index)}>
// //                 Remove
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// //  };

// // export default MyBookshelf;//for now dont mess 

// // // import React, { useState, useEffect } from 'react';
// // // import SearchBooks from './SearchBooks';
// // // import 'styles/mybookshelf.css'; // Add styles as needed
// // // import 'styles/searchbooks.css';

// // // const MyBookshelf = ({ books, onRemoveBook }) => {
// // //   const [showRemoveMessage, setShowRemoveMessage] = useState(false);
// // //   const [removedBookName, setRemovedBookName] = useState('');
// // //   const [reviews, setReviews] = useState({}); // Track reviews for books
// // //   const [ratings, setRatings] = useState({}); // Track ratings for books

// // //   // Navigate to MyBookshelf and update books if needed
// // //   useEffect(() => {
// // //     if (books.length > 0) {
// // //       console.log('Bookshelf updated:', books);
// // //     }
// // //   }, [books]);

// // //   // Save review to the database
// // //   const saveReviewToDB = async (bookId, reviewText) => {
// // //     try {
// // //       const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ review: reviewText }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to save review');
// // //       }
// // //       console.log('Review saved successfully!');
// // //     } catch (error) {
// // //       console.error('Error saving review:', error);
// // //     }
// // //   };

// // //   // Save rating to the database
// // //   const saveRatingToDB = async (bookId, rating) => {
// // //     try {
// // //       const response = await fetch(`http://localhost:5000/books/${bookId}/rating`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ rating }),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to save rating');
// // //       }
// // //       console.log('Rating saved successfully!');
// // //     } catch (error) {
// // //       console.error('Error saving rating:', error);
// // //     }
// // //   };

// // //   // Remove review from the database
// // //   const removeReviewFromDB = async (bookId) => {
// // //     try {
// // //       const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
// // //         method: 'DELETE',
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to remove review');
// // //       }
// // //       console.log('Review removed successfully!');
// // //     } catch (error) {
// // //       console.error('Error removing review:', error);
// // //     }
// // //   };

// // //   const handleRemoveBook = (index) => {
// // //     const bookName = books[index]?.title; // Safely get the book title
// // //     if (bookName) {
// // //       setRemovedBookName(bookName); // Set the removed book name
// // //       setShowRemoveMessage(true); // Show the remove success message
// // //       onRemoveBook(index); // Call the remove function
// // //       setTimeout(() => {
// // //         setShowRemoveMessage(false); // Hide message after 3 seconds
// // //         setRemovedBookName(''); // Clear the book name
// // //       }, 10000);
// // //     }
// // //   };

// // //   const handleRatingChange = (index, rating) => {
// // //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// // //     setRatings((prev) => ({
// // //       ...prev,
// // //       [index]: rating,
// // //     }));
// // //     if (bookId) saveRatingToDB(bookId, rating); // Save to DB
// // //   };

// // //   const handleReviewChange = (index, reviewText) => {
// // //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// // //     setReviews((prev) => ({
// // //       ...prev,
// // //       [index]: reviewText,
// // //     }));
// // //     if (bookId) saveReviewToDB(bookId, reviewText); // Save to DB
// // //   };

// // //   const handleRemoveReview = (index) => {
// // //     const bookId = books[index]?._id; // Assuming each book has a unique `_id`
// // //     setReviews((prev) => {
// // //       const updatedReviews = { ...prev };
// // //       delete updatedReviews[index];
// // //       return updatedReviews;
// // //     });
// // //     if (bookId) removeReviewFromDB(bookId); // Remove from DB
// // //   };

// // //   return (
// // //     <div className="my-bookshelf">
// // //       <h1>
// // //         <center>My Collections</center>
// // //       </h1>
// // //       {showRemoveMessage && (
// // //         <p className="success-message">
// // //           The Book "<strong>{removedBookName}</strong>" has been removed successfully from your bookshelf!
// // //         </p>
// // //       )}
// // //       {books.length === 0 ? (
// // //         <p className="book-message">
// // //           Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
// // //           personalized favourites.
// // //         </p>
// // //       ) : (
// // //         <ul>
// // //           {books.map((book, index) => (
// // //             <li className="book-box" key={index}>
// // //               <div>
// // //                 <img src={book.thumbnail} alt={book.title} />
// // //                 <h3>{book.title}</h3>
// // //                 <p className="author-name">Author: {book.author}</p>
// // //                 <p className="author-name">Average Rating: {book.averageRating || 'No ratings yet'}</p>
// // //               </div>
// // //               <div>
// // //                 <label className="author-name">
// // //                   Your Rating:
// // //                   <input
// // //                     className="book-rating-box"
// // //                     type="number"
// // //                     min="1"
// // //                     max="5"
// // //                     value={ratings[index] || ''}
// // //                     onChange={(e) => handleRatingChange(index, e.target.value)}
// // //                   />
// // //                 </label>
// // //               </div>
// // //               <div>
// // //                 <label className="author-name">
// // //                   Your Review:
// // //                   <textarea
// // //                     className="book-review"
// // //                     value={reviews[index] || ''}
// // //                     onChange={(e) => handleReviewChange(index, e.target.value)}
// // //                   />
// // //                 </label>
// // //                 {reviews[index] && (
// // //                   <button className="remove-review-button" onClick={() => handleRemoveReview(index)}>
// // //                     Remove Review
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <button className="remove-button" onClick={() => handleRemoveBook(index)}>
// // //                 Remove
// // //               </button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default MyBookshelf;

import React, { useState, useEffect } from 'react';
import 'styles/mybookshelf.css'; // Add styles as needed
import 'styles/searchbooks.css';

const MyBookshelf = ({ books, onRemoveBook }) => {
  const [showRemoveMessage, setShowRemoveMessage] = useState(false);
  const [removedBookName, setRemovedBookName] = useState('');
  const [reviews, setReviews] = useState({}); // Track reviews for books
  const [ratings, setRatings] = useState({}); // Track ratings for books 
  const [myBooks, setMyBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');  // State for success message
  

  // useEffect(() => {
  //   console.log('Bookshelf updated:', books);
  // }, [books]);

  // //to display the collection after reload 
  // const showCollection = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId") || ""
  //     const response = await fetch(`http://localhost:5000/api/books/user/${userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': localStorage.getItem('token')
  //       }
    
  //     });
  //     const data = await response?.json()
  //     if (!response.ok) {
  //       throw new Error('Failed to save review');
  //     }
  //     setMyBooks(data?.books)
  //     console.log('Your collection!', data);
  //   } catch (error) {
  //     console.error('Error in displaying collection:', error);
  //   }
  // };
  //  useEffect(() => {
  //   showCollection()
  //    }, []);for now

  useEffect(() => {
  const showCollection = async () => {
    const token = localStorage.getItem("token");  // Retrieve the stored token

    try {
      const userId = localStorage.getItem("userId") || "";
      const response = await fetch(`http://localhost:5000/api/books/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await response?.json();
      console.log('Fetched data:', data); // Debugging: Check the fetched data
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      setMyBooks(data?.books);
      console.log('Updated myBooks state:', data?.books); // Debugging: Verify state
    } catch (error) {
      console.error("Error in fetching collection:", error);
    }
  };
  showCollection();
}, []);



  // Save review to the database
  const saveReviewToDB = async (bookId, reviewText) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: reviewText }),
      });

      if (!response.ok) {
        throw new Error('Failed to save review');
      }
      console.log('Review saved successfully!');
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  // Save rating to the database
  const saveRatingToDB = async (bookId, rating) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}/rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to save rating');
      }
      console.log('Rating saved successfully!');
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  // Remove review from the database
  const removeReviewFromDB = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${bookId}/review`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove review');
      }
      console.log('Review removed successfully!');
    } catch (error) {
      console.error('Error removing review:', error);
    }
  };

  //Remove book from db and from collection
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
  
      const response = await fetch(`http://localhost:5000/api/books`, {
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
  
  

  const handleRatingChange = (index, rating) => {
    const bookId = books[index]?._id; // Assuming each book has a unique `_id`
    setRatings((prev) => ({
      ...prev,
      [index]: rating,
    }));
    if (bookId) saveRatingToDB(bookId, rating); // Save to DB
  };

  const handleReviewChange = (index, reviewText) => {
    const bookId = books[index]?._id; // Assuming each book has a unique `_id`
    setReviews((prev) => ({
      ...prev,
      [index]: reviewText,
    }));
    if (bookId) saveReviewToDB(bookId, reviewText); // Save to DB
  };

  const handleRemoveReview = (index) => {
    const bookId = books[index]?._id; // Assuming each book has a unique `_id`
    setReviews((prev) => {
      const updatedReviews = { ...prev };
      delete updatedReviews[index];
      return updatedReviews;
    });
    if (bookId) removeReviewFromDB(bookId); // Remove from DB
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
      {myBooks.length === 0 ? (
        <p className="book-message">
          Ah !!! Currently your bookshelf is empty. Start exploring books using the search feature and create your
          personalized favourites.
        </p>
      ) : (
        <ul>
          {myBooks.map((book, index) => (
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







