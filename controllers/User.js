const { User } = require("../models/User");

exports.getUserById = async (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      username: user.username,
      sno: user.sno,
      password: user.password,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
