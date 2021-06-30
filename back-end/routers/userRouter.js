const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

// router.post("/register", (req, res) => {
//   res.json({ msg: "Test register, Test Router" });
// });

// Registers
router.post("/register", userCtrl.register);
// Login
router.post("/login", userCtrl.login);
// Logout
router.get("/logout", userCtrl.logout);
// Refresh Token
router.get("/refresh_token", userCtrl.refreshToken);
// Infor Authrization
router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
