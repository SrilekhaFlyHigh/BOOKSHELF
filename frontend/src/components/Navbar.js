

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.navItem}>Home</Link></li>
        {!isLoggedIn && <li><Link to="/login" style={styles.navItem}>Login</Link></li>}
        {!isLoggedIn && <li><Link to="/signup" style={styles.navItem}>Signup</Link></li>}
        {isLoggedIn && <li><Link to="/my-bookshelf" style={styles.navItem}>My Bookshelf</Link></li>}
        {isLoggedIn && <li><Link to="/search-books" style={styles.navItem}>Search Books</Link></li>}
        {isLoggedIn && <li><button onClick={onLogout} style={styles.navButton}>Logout</button></li>}
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
    backgroundColor: 'sandybrown',
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
  },

  navButton: {
    position: 'relative',
    top: '-10px',
    fontSize: '1.2rem',
  }
};

export default Navbar;