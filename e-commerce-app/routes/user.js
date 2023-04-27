const expres = require("express");
const router = expres.Router();
const { signup, login } = require("../controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
