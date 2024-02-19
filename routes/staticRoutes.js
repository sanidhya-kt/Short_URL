const express = require("express");
const path = require("path");
const URL = require("../models/urlModel");
const {restrictTo} = require("../middleware/auth")
const router = express.Router();

router.get("/home/admin", restrictTo(["admin"]), async(req, res) =>{
  const allURL = await URL.find({});
  res.render("home", {
    urls: allURL,
  });
})

router.get("/home", restrictTo(["admin", "user"]), async (req, res) => {
  const allURL = await URL.find({createdBy: req.user._id});
  res.render("home", {
    urls: allURL,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res)=>{
  return res.render("signin");
})
module.exports = router;
