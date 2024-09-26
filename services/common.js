const passport = require("passport");

exports.isAuth = (req, res, done) => {
  // console.log(req.headers);
  // if (req.user) {
  //   return done();
  // }
  // return res.send("unauthorized");
  console.log("sanitize user called");
  return passport.authenticate("jwt", { session: false });
};

exports.sanitizeUser = (user) => {
  return { id: user.id, username: user.username };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
