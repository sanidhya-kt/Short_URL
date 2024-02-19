const { getUser } = require("../utils/auth");

function checkForAuthentication(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return next();
  }
  const user = getUser(userUid);

  if (!user) {
    res.redirect("/signup");
  }
  req.user = user;

  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) res.redirect("/signin");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
