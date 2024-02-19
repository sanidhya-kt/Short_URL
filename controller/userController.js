const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");

async function userSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/home");
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    res.render("signin", { error: "invalid username or login password" });
  }
  
  const jwtToken = setUser(user);
  res.cookie("uid", jwtToken);
  res.redirect("/home");
}

module.exports = { userSignup, userLogin };
