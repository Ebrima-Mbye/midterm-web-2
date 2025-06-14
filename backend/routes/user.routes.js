// backend/routes/user.routes.js
const express = require("express");
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/user.controller");
const { verifyToken, checkRole } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", verifyToken, checkRole(["Admin"]), getAllUsers);
router.put("/:id/role", verifyToken, checkRole(["Admin"]), updateUserRole);

module.exports = router;
