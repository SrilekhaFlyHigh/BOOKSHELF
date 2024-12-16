// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// const signup = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     user = new User({ email, password });
//     await user.save();

//     const payload = { id: user._id };
//     const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = { id: user._id };
//     const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const protectRoute = async (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { signup, login, protectRoute }; Already in github

// backend/controllers/authController.js
const User = require('../models/User');

// Handle user registration
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Export the controller
module.exports = { signup };

