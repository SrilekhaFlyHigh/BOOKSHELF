
const mongoose = require("mongoose");// Added some

const bookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, default: 0 },
  review: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
});

module.exports = mongoose.model("Book", bookSchema);
