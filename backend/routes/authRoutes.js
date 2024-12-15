const express = require('express');
const { signup, login, protectRoute } = require('../controllers/authController');

const router = express.Router();

// Public routes for signup and login
router.post('/signup', signup);
router.post('/login', login);

// Protected route for user profile
router.get('/profile', protectRoute, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

module.exports = router;
