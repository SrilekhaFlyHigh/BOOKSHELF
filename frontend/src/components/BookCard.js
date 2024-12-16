// import React from 'react';

// const BookCard = ({ book }) => {
//   return (
//     <div className="book-card">
//       <img src={book.thumbnail} alt={book.title} />
//       <h3>{book.title}</h3>
//       <p>{book.author}</p>
//       <p>{book.averageRating}</p>
//     </div>
//   );
// };

// export default BookCard; GITHUB uploaded

import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg'}
        alt={book.volumeInfo.title}
      />
      <h3>{book.volumeInfo.title}</h3>
      <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
    </div>
  );
};

export default BookCard;

