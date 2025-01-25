// // const express = require('express');
// // const { signup, login, protectRoute } = require('../controllers/authController');

// // const router = express.Router();

// // // Public routes for signup and login
// // router.post('/signup', signup);
// // router.post('/login', login);

// // // Protected route for user profile
// // router.get('/profile', protectRoute, (req, res) => {
// //   res.json({ message: 'Welcome to your profile', user: req.user });
// // });

// // module.exports = router;


// // // backend/routes/authRoutes.js
// // const express = require('express');
// // const { signup } = require('../controllers/authController');
// // const router = express.Router();

// // // Signup route
// // router.post('/signup', signup);

// // module.exports = router;


// const express = require("express");
// const { signup, login, getUserDetails } = require("../controllers/authController");
// const { authenticateToken } = require("../server"); // Import authenticateToken function from server.js

// const router = express.Router();

// // Signup route
// router.post("/signup", signup);

// // Login route
// router.post("/login", login);

// // Get user details (optional)
// //router.get("/me", authenticateToken, getUserDetails);

// module.exports = router;


// authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;// Added some