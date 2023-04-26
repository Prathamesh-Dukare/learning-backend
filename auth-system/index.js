const app = require("./app");
const express = require("express");
const { user } = require("./model/user");
const { PORT } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);

  if (!(email && name)) {
    res.status(400).send("All is required");
  }

  // create a user in our db
  const existingUser = await user.findOne({ name, email });

  if (existingUser) {
    res.status(409).send("User already exists");
  }

  // creating new user
  let newUser = await user.create({ name, email });
  // token
  const token = jwt.sign({ user_id: user._id, email }, process.env.MY_SECRET, {
    expiresIn: "2h",
  });

  newUser.token = token;

  res.status(201).json({
    status: "success",
    user: newUser,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening`, PORT);
});
