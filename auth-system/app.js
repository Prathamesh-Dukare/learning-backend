require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connect = require("./config/db");
const User = require("./model/user");
const verifyToken = require("./middleware/auth");
var cookieParser = require("cookie-parser");

const app = express();
connect();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello auth-system!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!(email && name)) {
    res.status(400).send("All fiedls are required");
  }

  // create a user in our db
  const existingUser = await User.findOne({ name, email });

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating new user
  let newUser = await User.create({ name, email, password: hashedPassword });

  // token
  const token = jwt.sign(
    { user_id: newUser._id, email },
    process.env.MY_SECRET,
    {
      expiresIn: "2h",
    }
  );

  newUser.token = token;

  res.status(201).json({
    status: "success",
    user: newUser,
    password: hashedPassword,
    token: token,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("Some fields are missing");
  }

  // check if user exists
  let user = await User.findOne({ email });

  // check if password is correct
  const isPasswordCorrect = bcrypt.compare(password, user.password);

  if (user && isPasswordCorrect) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.MY_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    user.password = undefined;

    // send token in cookie & set cookie expire time
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      status: "success",
      user: user,
      token: token,
    });
  }

  return res.status(400).send("Invalid password");
});

app.get("/getuser", verifyToken, (req, res) => {
  res.send("Hello getuser info");
});

module.exports = app;
