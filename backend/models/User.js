const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcrypt = require("bcryptjs");
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.validatePassword = async function (plainPassword) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
