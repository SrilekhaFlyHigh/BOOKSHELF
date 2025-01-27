
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import './styles/bookdetails.css';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // const response = await fetch(`http://localhost:5000/book/${id}`);
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBook(data);
        setFormData({
          title: data.title || '',
          author: data.author || '',
          description: data.description || '',
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
        setError('Unable to fetch book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      //const response = await fetch(`http://localhost:5000/book/${id}`, {
        const response = await fetch(`https://bookshelf-lp8f.onrender.com/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update the book. Please try again.');
      }

      const updatedBook = await response.json();
      setBook(updatedBook);
      setIsEditing(false);
      alert('Book details updated successfully!');
    } catch (error) {
      console.error('Error saving book details:', error);
      setError('Unable to save changes. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
    });
  };

  return (
    <div className="book-details-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : book ? (
        <div className="book-details">
          {isEditing ? (
            <div>
              <label>
                <strong>Title:</strong>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Author:</strong>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Description:</strong>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <h2>{book.title}</h2>
              <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
              <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
              {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
              )}
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => navigate('/my-bookshelf')}>Back to My Bookshelf</button>
            </div>
          )}
        </div>
      ) : (
        <p>No book found with the provided ID.</p>
      )}
    </div>
  );
}

export default BookDetails;

