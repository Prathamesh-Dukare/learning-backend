const User = require("../models/user");
const promiceHOF = require("./promiseHOF");
const jwt = require("jsonwebtoken");

exports.injectUser = promiceHOF(async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.headers.token.replace("Bearer ", "") ||
    req.body.token;

  if (!token) return next("No token provided");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  req.user = user;
  next();
});
