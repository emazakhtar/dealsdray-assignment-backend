const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.get("/", userController.getUserById);

exports.router = router;
