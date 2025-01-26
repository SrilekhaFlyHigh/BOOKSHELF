// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import MyBookshelf from './pages/MyBookshelf';
// import SearchBooks from './pages/SearchBooks';
// import Footer from './components/Footer';
// import axios from 'axios';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);// Added some
//   const [myBooks, setMyBooks] = useState([]); // State to manage books in MyBookshelf
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message
//   const [ratings, setRatings] = useState({}); // State to track ratings
//   const [reviews, setReviews] = useState({}); // State to track reviews
//   const navigate = useNavigate();
// //   const saveBookToDB = async (bookData) => {
// //   const token = localStorage.getItem('token');
// //   if (!token) {
// //     alert('You must be logged in!');
// //     return;
// //   }
// //   try {
// //     const response = await axios.post(
// //       'http://localhost:5000/api/books',
// //       bookData,
// //       {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       }
// //     );
// //     console.log('Book saved successfully:', response.data);
// //     navigate('/my-bookshelf');
// //   } catch (error) {
// //     console.error('Error saving book:', error);
// //     if (error.response && error.response.status === 401) {
// //       alert('Token is invalid or expired. Please log in again.');
// //     } else {
// //       alert('An error occurred while saving the book.');
// //     }
// //   }
// // };
  

//   // Check if the user is logged in on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     navigate('/my-bookshelf');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token from localStorage
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false); // Update login state
//     navigate('/'); // Redirect to home
//   };

//   // Add book to MyBookshelf and trigger success message
//   const addBookToBookshelf = (book) => {
//     //saveBookToDB(book)
//     setMyBooks((prevBooks) => [...prevBooks, book]);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000); // Auto-hide success message after 3 seconds
//   };

//   // Remove book from MyBookshelf
//   const removeBookFromBookshelf = (bookIndex) => {
//     setMyBooks((prevBooks) => prevBooks.filter((_, index) => index !== bookIndex));
//   };

//   // Handle rating change
//   const handleRatingChange = (index, rating) => {
//     setRatings((prev) => ({
//       ...prev,
//       [index]: rating,
//     }));
//   };

//   // Handle review change
//   const handleReviewChange = (index, reviewText) => {
//     setReviews((prev) => ({
//       ...prev,
//       [index]: reviewText,
//     }));
//   };

//   // Remove a review
//   const handleRemoveReview = (index) => {
//     setReviews((prev) => {
//       const updatedReviews = { ...prev };
//       delete updatedReviews[index];
//       return updatedReviews;
//     });
//   };

//   return (
//     <>
//       <div>
//         <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//         <Routes>
//           <Route
//             path="/"
//             element={<Home />}
//           />
//           <Route
//             path="/my-bookshelf"
//             element={
//               isLoggedIn ? (
//                 <MyBookshelf
//                   books={myBooks}
//                   onRemoveBook={removeBookFromBookshelf} // Pass remove function
//                   ratings={ratings} // Pass ratings state
//                   reviews={reviews} // Pass reviews state
//                   onRatingChange={handleRatingChange} // Pass rating change handler
//                   onReviewChange={handleReviewChange} // Pass review change handler
//                   onRemoveReview={handleRemoveReview} // Pass review remove handler
//                   showSuccessMessage={showSuccessMessage} // Pass success message state
//                 />
//               ) : (
//                 <Login onLoginSuccess={handleLoginSuccess} />
//               )
//             }
//           />
//           <Route
//             path="/search-books"
//             element={
//               isLoggedIn ? (
//                 <SearchBooks
//                   onAddBook={addBookToBookshelf} // Pass function to add books
//                 />
//               ) : (
//                 <Login onLoginSuccess={handleLoginSuccess} />
//               )
//             }
//           />
//           <Route
//             path="/login"
//             element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}
//           />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBookshelf from './pages/MyBookshelf';
import SearchBooks from './pages/SearchBooks';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [myBooks, setMyBooks] = useState([]); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [ratings, setRatings] = useState({}); 
  const [reviews, setReviews] = useState({}); 
  const navigate = useNavigate();

  // Check if the user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/my-bookshelf');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem("userId");
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  // Add book to MyBookshelf and trigger success message
  const addBookToBookshelf = async (book) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in!');
      return;
    }
    
    try {
      // Send book to the backend
      const response = await axios.post(
        'http://localhost:5000/api/books', 
        book,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Book saved successfully:', response.data);
      setMyBooks((prevBooks) => [...prevBooks, response.data]); // Add the book to the frontend list
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Auto-hide success message after 3 seconds
    } catch (error) {
      console.error('Error saving book:', error);
      if (error.response && error.response.status === 401) {
        alert('Token is invalid or expired. Please log in again.');
      } else {
        alert('An error occurred while saving the book.');
      }
    }
  };

  // Remove book from MyBookshelf
  const removeBookFromBookshelf = (bookIndex) => {
    setMyBooks((prevBooks) => prevBooks.filter((_, index) => index !== bookIndex));
  };

  // Handle rating change
  const handleRatingChange = (index, rating) => {
    setRatings((prev) => ({
      ...prev,
      [index]: rating,
    }));
  };

  // Handle review change
  const handleReviewChange = (index, reviewText) => {
    setReviews((prev) => ({
      ...prev,
      [index]: reviewText,
    }));
  };

  // Remove a review
  const handleRemoveReview = (index) => {
    setReviews((prev) => {
      const updatedReviews = { ...prev };
      delete updatedReviews[index];
      return updatedReviews;
    });
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/my-bookshelf"
          element={
            isLoggedIn ? (
              <MyBookshelf
                books={myBooks}
                onRemoveBook={removeBookFromBookshelf}
                ratings={ratings}
                reviews={reviews}
                onRatingChange={handleRatingChange}
                onReviewChange={handleReviewChange}
                onRemoveReview={handleRemoveReview}
                showSuccessMessage={showSuccessMessage}
              />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/search-books"
          element={
            isLoggedIn ? (
              <SearchBooks
                onAddBook={addBookToBookshelf} // Pass function to add books
              />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
