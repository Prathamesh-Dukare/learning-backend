const app = require("./app");
const express = require("express");
const { user } = require("./model/user");
const { PORT } = process.env;
var bcrypt = require("bcryptjs");

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
  } else {
    user.create({ name, email });
    res.status(200).send("Registered");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening`, PORT);
});
