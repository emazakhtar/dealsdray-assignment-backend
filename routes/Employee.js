const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/Employee");
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router
  .post("/create-employee", upload.single("image"), employeeController.create)
  .patch("/update-employee/:id", employeeController.update)
  .get("/get-employees", employeeController.getAll)
  .get("/get-employee/:id", employeeController.getEmployeeById)
  .delete("/delete-employee/:id", employeeController.deleteEmployee);

exports.router = router;
