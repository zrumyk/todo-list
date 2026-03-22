const express = require("express");
const router = express.Router();

// routes import
const userRoutes = require("../routes/user.routes");
const taskRoutes = require("../routes/task.routes");

// global router
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
