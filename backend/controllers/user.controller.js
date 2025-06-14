// backend/controllers/user.controller.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated!", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
