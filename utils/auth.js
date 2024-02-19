//const sessionIdToUsermap = new Map(); -- use in startfull auth
const jwt = require("jsonwebtoken");
const secretKey = "KSDFNSDKF374923wjef$%$@$";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(jwtToken) {
  if (!jwtToken) return null;
  try {
    return jwt.verify(jwtToken, secretKey);
  } catch (error) {
    return null;        // sirf issliye taki server crash nah kare 
  }
}

module.exports = { setUser, getUser };
