

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  review: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
