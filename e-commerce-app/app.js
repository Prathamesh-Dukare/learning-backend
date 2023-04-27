require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// import routes
const home = require("./routes/home");
const user = require("./routes/user");

const app = express();

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add-on middlewares
app.use(morgan("tiny"));
app.use(cookieParser());

// routes
app.use("/api/v1", home);
app.use("/api/v1/auth", user);

module.exports = app;
