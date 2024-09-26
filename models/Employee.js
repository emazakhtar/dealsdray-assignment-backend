const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const employeeSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    designation: { type: String, reqired: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

exports.Employee = mongoose.model("Employee", employeeSchema);
