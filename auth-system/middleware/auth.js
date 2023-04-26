const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers["x-access-token"] ||
      req.headers["authorization"].replace("Bearer ", "") ||
      req.body.token;

    if (!token) {
      res.send("Token not found");
    }

    const decoded = jwt.verify(token, process.env.MY_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token or missing");
  }

  return next();
};

module.exports = verifyToken;
