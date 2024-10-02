const model = require("../models/Employee");
const Employee = model.Employee;

// CREATE...
exports.create = async (req, res) => {
  console.log(req.body, req.file);
  const employee = new Employee(req.body);

  try {
    const response = await employee.save();
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

// READ ALL...
exports.getAll = async (req, res) => {
  let query = await Employee.find({});
  console.log(query);
  try {
    res.status(200).json(query);
  } catch (err) {
    res.status(400).json(err);
  }
};
// READ ONE...
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Employee.findById(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
// UPDATE...
exports.update = async (req, res) => {
  console.log("hjhjhjh");
  const { id } = req.params;
  console.log(id, req.body);
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
// DELETE...
exports.deleteEmployee = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    console.log("oooo");
    const doc = await Employee.findOneAndDelete({ _id: id });
    console.log("gggg");
    console.log(doc);

    res.status(200).json(doc);
  } catch (err) {
    console.log("error hai");
    console.log(err);
    res.status(400).json(err);
  }
};
