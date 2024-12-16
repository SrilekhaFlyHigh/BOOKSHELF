const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // User model

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key_here";


app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect(
    "mongodb+srv://bookshelfadmin:adminbookshelf@bookshelfdb.pqi6h.mongodb.net/?retryWrites=true&w=majority&appName=bookshelfdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));



app.post("/api/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error); 
    res.status(500).json({ error: "Failed to register user" });
  }
});



app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
