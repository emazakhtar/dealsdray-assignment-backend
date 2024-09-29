const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/Employee");

router
  .post("/create-employee", employeeController.create)
  .post("/update-employee/:id", employeeController.update)
  .get("/get-employee", employeeController.getAll)
  .delete("/delete-employee/:id", employeeController.deleteEmployee);

exports.router = router;
