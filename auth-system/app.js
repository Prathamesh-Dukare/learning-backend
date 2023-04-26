require("dotenv").config();
const express = require("express");
const app = express();
require("./db").connect();

app.get("/", (req, res) => {
  res.send("<h1>Helllo auth</h1>");
});

module.exports = app;
