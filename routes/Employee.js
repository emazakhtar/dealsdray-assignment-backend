const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/Employee");

router
  .post("/create-employee", employeeController.create)
  .post("/update-employee/:id", employeeController.update)
  .get("/get-employee", employeeController.getAll);

exports.router = router;
