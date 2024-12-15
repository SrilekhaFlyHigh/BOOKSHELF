import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log('Error:', error));
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <p>Author: {book.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetails;
