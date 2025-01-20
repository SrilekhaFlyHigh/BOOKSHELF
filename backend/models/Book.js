

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

module.exports = mongoose.model("Book", bookSchema);

