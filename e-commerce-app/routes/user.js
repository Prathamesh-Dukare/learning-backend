const expres = require("express");
const router = expres.Router();
const {
  signup,
  login,
  logout,
  getLoggedInUserDetails,
} = require("../controller/userController");
const { injectUser } = require("../middleware/injectUser");

console.log(getLoggedInUserDetails);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getuser").get(injectUser, getLoggedInUserDetails);

module.exports = router;
