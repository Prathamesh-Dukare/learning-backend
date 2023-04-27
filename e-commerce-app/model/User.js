const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
});

// encrypt password before saving - Hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// compare password
userSchema.methods.isValidatedPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// create and return a jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// generate a password reset token - string
userSchema.methods.getResetPasswordString = function () {
  // genarate a long random string
  const resetToken = crypto.randomBytes(20).toString("hex");
  
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
};

module.exports = mongoose.model("User", userSchema);
