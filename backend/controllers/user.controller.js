// backend/controllers/user.controller.js
const User = require("../models/user");

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
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent removing last Admin
    if (user.role === "Admin" && role !== "Admin") {
      const adminCount = await User.countDocuments({ role: "Admin" });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "At least one admin must remain in the system",
        });
      }
    }

    // Proceed to update
    user.role = role;
    await user.save();

    res.json({
      message: "Role updated!",
      user: { ...user.toObject(), password: undefined },
    });

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated!", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete)
      return res.status(404).json({ message: "User not found" });

    if (userToDelete.role === "Admin") {
      const adminCount = await User.countDocuments({ role: "Admin" });
      if (adminCount <= 1) {
        return res
          .status(400)
          .json({ message: "Cannot delete the only Admin" });
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};
