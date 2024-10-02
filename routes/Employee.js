const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/Employee");

// Multer setup for file uploads

router
  .post("/create-employee", employeeController.create)
  .patch("/update-employee/:id", employeeController.update)
  .get("/get-employees", employeeController.getAll)
  .get("/get-employee/:id", employeeController.getEmployeeById)
  .delete("/delete-employee/:id", employeeController.deleteEmployee);

exports.router = router;
