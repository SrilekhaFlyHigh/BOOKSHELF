// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require('../models/User');

// // // Handle user registration
// // const signup = async (req, res) => {
// //   const { firstName, lastName, email, password } = req.body;

// //   if (!firstName || !lastName || !email || !password) {
// //     return res.status(400).json({ message: 'Please fill all fields' });
// //   }

// //   // Check if user already exists
// //   const existingUser = await User.findOne({ email });
// //   if (existingUser) {
// //     return res.status(400).json({ message: 'User already exists' });
// //   }

// //   // Create a new user
// //   const newUser = new User({
// //     firstName,
// //     lastName,
// //     email,
// //     password,
// //   });

// //   try {
// //     await newUser.save();
// //     res.status(201).json({ message: 'User created successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error, try again later' });
// //   }
// // };

// // // Export the controller
// // module.exports = { signup };


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup Controller
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully. Please log in now!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, userId: user?._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Get User Details Controller (optional)
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

module.exports = { signup, login, getUserDetails }; // Added some

// // authController.js
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return res.status(201).json({ message: "User registered successfully. Please log in now!" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

// //const User = require("../models/User");
// //const bcrypt = require("bcryptjs");
// //const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Log the JWT_SECRET value to verify it is being read correctly
//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Server error. Please try again later." });
//   }
// };

// module.exports = {
//   login,
//   signup
// }