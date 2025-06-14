// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Editor", "Viewer"],
    default: "Viewer",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 💥 Add this line instead of directly exporting mongoose.model('User', ...)
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
