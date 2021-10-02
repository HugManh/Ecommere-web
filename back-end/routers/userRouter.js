const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

// router.post("/register", (req, res) => {
//   res.json({ msg: "Test register, Test Router" });
// });

// Registers
/**
 * @swagger
 * /user/register
 *  post:
 *   summary: create a new account
 *   description: create account for user
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#definitions/account
 *    responses:
 *     200:
 *      description: account created successfully
 *     500:
 *      description: account create failure
 */
router.post("/register", userCtrl.register);

// Login
/**
 * @swagger
 * /user/register
 *  post:
 *   summary: create a new account
 *   description: create account for user
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#definitions/account
 *    responses:
 *     200:
 *      description: account created successfully
 *     500:
 *      description: account create failure
 */
router.post("/login", userCtrl.login);
// Logout
/**
 * @swagger
 * /user/register
 *  post:
 *   summary: create a new account
 *   description: create account for user
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#definitions/account
 *    responses:
 *     200:
 *      description: account created successfully
 *     500:
 *      description: account create failure
 */
router.get("/logout", userCtrl.logout);
// Refresh Token
router.get("/refresh_token", userCtrl.refreshToken);
// Infor Authrization
/**
 * @swagger
 * /user/infor
 *   get:
 *     description: Get infor user
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/infor", auth, userCtrl.getUser);

module.exports = router;
