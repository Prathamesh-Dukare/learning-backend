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
  const isUserExists = User.findOne({ email });
  if (isUserExists) return res.status(400).json({ message: "User already exists" });

  const newUser = await User.create({
    name,
    email,
    password,
  });

  sendCookie(res, newUser);
});
