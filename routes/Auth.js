const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");
const passport = require("passport");
router
  .post("/signup", authController.signUpUser)
  .post(
    "/login",
    passport.authenticate("local", { session: false }),
    authController.loginUser
  )
  .get(
    "/check",
    passport.authenticate("jwt", { session: false }),
    authController.checkUser
  )
  .get("/logout", authController.logoutUser);

exports.router = router;
