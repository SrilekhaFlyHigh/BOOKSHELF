
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
  const navigate = useNavigate();

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
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the login state to false
    navigate('/');
  };

  const [bookshelf, setBookshelf] = useState([]);

  // Function to add a book to the bookshelf
  const addBookToBookshelf = async (book) => {
    const bookData = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['Unknown Author'],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg',
      description: book.volumeInfo.description || 'No description available.',
    };

    try {
      // Save book to the backend
      const response = await axios.post('http://localhost:5000/api/bookshelf', bookData);
      // Update state with the newly added book
      setBookshelf((prevBookshelf) => [...prevBookshelf, response.data]);
      console.log('Book successfully added:', response.data);
    } catch (error) {
      console.error('Error adding book to bookshelf:', error);
    }
  };

  return (
    <>
      <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Home />}
        />
        <Route
          path="/my-bookshelf"
          element={isLoggedIn ? <MyBookshelf /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/search-books"
          element={isLoggedIn ? <SearchBooks /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;