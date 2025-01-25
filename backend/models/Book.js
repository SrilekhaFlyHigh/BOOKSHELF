

// // const mongoose = require("mongoose");

// // const bookSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   author: {
// //     type: String,
// //   },
// //   thumbnail: {
// //     type: String,
// //   },
// //   rating: {
// //     type: Number,
// //     default: 0,
// //   },
// //   review: {
// //     type: String,
// //   },
// // });

// // module.exports = mongoose.model("Book", bookSchema);

// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // References the User model
//       required: true,
//     },
//     bookId: {
//       type: String,
//       required: true, // Book ID from external API or user-generated
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: String,
//       required: true,
//     },
//     thumbnail: { type: String },
//     rating: {
//       type: String,
//       default: "N/A", // Default rating if not provided
//     },
//     review: {
//       type: String,
//       default: "", // Default to empty string if no review is provided
//     },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt fields automatically
// );

// // Create the model using the schema
// const Book = mongoose.model("Book", bookSchema);

// module.exports = Book;

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
