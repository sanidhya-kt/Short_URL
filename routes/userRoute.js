const express = require("express");
const { userSignup, userLogin } = require("../controller/userController");
const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userLogin);
module.exports = router;
