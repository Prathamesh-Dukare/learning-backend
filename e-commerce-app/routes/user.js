const expres = require("express");
const router = expres.Router();
const { signup } = require("../controller/userController");

router.route("/signup").post(signup);

module.exports = router;
