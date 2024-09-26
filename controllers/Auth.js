const SECRET_KEY = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../services/common");

exports.loginUser = async (req, res) => {
  console.log("req.user", req.user);
  if (req.user) {
    const token = jwt.sign(sanitizeUser(req.user), SECRET_KEY);
    res
      .status(200)
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 86400000), // cookie will be removed after 8 hours
      })
      .json(token);
  }
};

exports.signUpUser = async (req, res, next) => {};

exports.logoutUser = async (req, res) => {
  console.log("logout user called");

  res
    .status(200)
    .cookie("jwt", null, {
      expires: new Date(Date.now()), // cookie is expired now
    })
    .json({ message: "logout successfull" });
};

exports.checkUser = (req, res) => {
  console.log("checkuser ko hit kia");
  if (req && req.user) {
    const token = jwt.sign(sanitizeUser(req.user), SECRET_KEY);
    res.status(200).json(token);
  } else {
    res.status(400).send("session expired login again");
  }
};
