const model = require("../models/Employee");
const Employee = model.Employee;

// CREATE...
exports.create = async (req, res) => {
  console.log(req.body);
  const employee = new Employee(req.body);

  try {
    const response = await employee.save();
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

// READ...
exports.getAll = async (req, res) => {
  let query = await Employee.find({});
  console.log(query);
  try {
    res.status(200).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};
// UPDATE...
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const response = await employee.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
