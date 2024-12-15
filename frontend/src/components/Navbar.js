import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.navItem}>Home</Link></li>
        <li><Link to="/login" style={styles.navItem}>Login</Link></li>
        <li><Link to="/signup" style={styles.navItem}>Signup</Link></li>
        <li><Link to="/mybookshelf" style={styles.navItem}>My Bookshelf</Link></li>
        <li><Link to="/searchbooks" style={styles.navItem}>Search Books</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'sandybrown',
    padding: '1rem',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: '#fff',
    margin: '0 1rem',
    textDecoration: 'none',
    fontSize: '1.2rem',
  },
};

export default Navbar;

