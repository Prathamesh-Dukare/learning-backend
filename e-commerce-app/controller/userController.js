const promiceHOF = require("../middleware/promiseHOF");
const sendCookie = require("../utils/sendCookie");
const User = require("../model/User");

exports.signup = promiceHOF(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // check if the user already exists
  const isUserExists = await User.findOne({ email });
  console.log(isUserExists, "isUserExists");

  if (isUserExists)
    return res.status(400).json({ message: "User already exists" });

  const newUser = await User.create({
    name,
    email,
    password,
  });

  sendCookie(res, newUser);
});

exports.login = promiceHOF(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordValid = await user.isValidatedPassword(password);

  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  sendCookie(res, user);
});

exports.logout = promiceHOF(async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});
