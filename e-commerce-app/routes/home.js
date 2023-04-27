const express = require("express");
const router = express.Router();
const { home, hello } = require("../controller/homeController");

router.route("/hey").get(home);
router.route("/hello").get(hello);

module.exports = router;
