// import React, { useState } from 'react';
// import axios from 'axios';
// import 'styles/searchbooks.css';

// const SearchBooks = ({ onAddBook }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(''); // Success message state

//   const fetchBooks = async () => {
//     if (searchTerm.trim() === '') return; // Prevent empty searches
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDSQylmKgyAyg4ahgBu4-Rw50atRUONZ4M`
//       );

//       setBooks(response.data.items || []);
//     } catch (err) {
//       console.error('Error fetching books:', err);

//       if (err.response?.status === 429) {
//         setError('You’ve reached the request limit. Please try again later.');
//       } else {
//         setError('Unable to fetch books. Please check your connection.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     fetchBooks();
//   };

//   const handleAddBook = (book) => {
//     onAddBook({
//       title: book.volumeInfo.title,
//       author: book.volumeInfo.authors?.join(', ') || 'Unknown',
//       thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
//       rating: 0, // Default rating, could be updated later
//       review: '', // Default empty review
//     });
    

//     // Set and display success message
//     setSuccessMessage(
//             <>
//               <strong>{book.volumeInfo.title}</strong> has been added to your bookshelf! Please go to MyBookshelf and check.
//             </>
//           );
//     setTimeout(() => setSuccessMessage(''), 10000); // Auto-hide the success message after 10 seconds
//   };

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Welcome to Books World !!!</h1>
//       <p className='book-message'>
//         Please type any keyword or book name and start exploring books you love!!!
//       </p>
//       <input
//         className='searchbox'
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search for books"
        
//       />
//       <button
//         className='searchbutton'
//         onClick={handleSearch}
        
//       >
//         Search
//       </button>

//       {/* Display success message */}
//       {successMessage && <p className='success-message'>{successMessage}</p>}

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div className="books-grid">
//         {books.map((book, index) => (
//           <div key={book.id || index} className='book-box'>
//             <h3>{book.volumeInfo.title}</h3>
//             <p className='author-name'>
//               Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}
//             </p>
//             {book.volumeInfo.imageLinks?.thumbnail && (
//               <img
//                 src={book.volumeInfo.imageLinks.thumbnail}
//                 alt={book.volumeInfo.title}
//               />
//             )}
//             <button
//               className='addtobookshelf-btn'
//               onClick={() => handleAddBook(book)}
              
//             >
//               Add to Bookshelf
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBooks;//frontend code sont remve it 




 import React, { useState } from 'react'; //with db code sooper working dont change
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 import 'styles/searchbooks.css';
const saveBookToDB = async (bookData, navigate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in!');
    return;
  }
  try {
    const response = await axios.post(
      'http://localhost:5000/api/books',
      bookData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Book saved successfully:', response.data);
    navigate('/my-bookshelf');
  } catch (error) {
    console.error('Error saving book:', error);
    if (error.response && error.response.status === 401) {
      alert('Token is invalid or expired. Please log in again.');
    } else {
      alert('An error occurred while saving the book.');
    }
  }
};

const SearchBooks = ({ onAddBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const fetchBooks = async () => {
    if (searchTerm.trim() === '') return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDSQylmKgyAyg4ahgBu4-Rw50atRUONZ4M`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      console.error('Error fetching books:', err);
      if (err.response?.status === 429) {
        setError('You’ve reached the request limit. Please try again later.');
      } else {
        setError('Unable to fetch books. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchBooks();
  };


  const handleAddBook = (book) => {
    const bookData = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', ') || 'Unknown',
      description: book.volumeInfo.description || 'No description available.',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
      rating: 0,
      review: '',
    };

    

    setSuccessMessage(
      `${book.volumeInfo.title} has been added to your bookshelf! Please go to MyBookshelf and check.`
    );

    setTimeout(() => setSuccessMessage(''), 10000);
    saveBookToDB(bookData, navigate);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to Books World !!!</h1>
      <p className="book-message">
        Please type any keyword or book name and start exploring books you love!!!
      </p>
      <input
        className="searchbox"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books"
      />
      <button className="searchbutton" onClick={handleSearch}>
        Search
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="books-grid">
        {books.map((book, index) => (
          <div key={book.id || index} className="book-box">
            <h3>{book.volumeInfo.title}</h3>
            <p className="author-name">
              Author: {book.volumeInfo.authors?.join(', ') || 'Unknown'}
            </p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <button
              className="addtobookshelf-btn"
              onClick={() => handleAddBook(book)}
            >
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
