const express = require("express");
const { addBookToBookshelf, updateBook, getUserBooks, authenticateToken } = require("../controllers/bookController");
const router = express.Router();

router.post("/", authenticateToken, addBookToBookshelf);
router.put("/:bookId", authenticateToken, updateBook);
router.get("/user/:userId", authenticateToken, getUserBooks);

module.exports = router;

