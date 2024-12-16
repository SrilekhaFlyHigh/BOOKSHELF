import React, { useState } from 'react';
import SearchBooks from '../pages/SearchBooks';
import BookCard from '../components/BookCard';

const MyBookshelf = () => {
  const [books, setBooks] = useState([]);

  
  const addBookToBookshelf = (book) => {
    console.log("Book added:", book); 
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <div className="my-bookshelf">
      <h1>My Bookshelf</h1>

      
      <SearchBooks addBookToBookshelf={addBookToBookshelf} />

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

export default MyBookshelf; //GITHUB UPLOADED

// import React, { useState } from 'react';
// import SearchBooks from '../pages/SearchBooks';
// import BookCard from '../components/BookCard';

// const MyBookshelf = () => {
//   const [books, setBooks] = useState([]);

//   const addBookToBookshelf = (book) => {
//     console.log("Book added:", book);
//     setBooks((prevBooks) => [...prevBooks, book]);
//   };

//   return (
//     <div className="my-bookshelf">
//       <h1>My Bookshelf</h1>
//       <SearchBooks addBookToBookshelf={addBookToBookshelf} />
//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book, index) => (
//             <BookCard key={index} book={book} />
//           ))
//         ) : (
//           <p>No books in your bookshelf.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookshelf;

