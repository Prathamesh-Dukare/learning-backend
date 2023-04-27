const expres = require("express");
const router = expres.Router();
const { signup, login, logout } = require("../controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;