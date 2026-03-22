const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const taskMiddleware = require("../middleware/zod/task.middleware");

router.use(authMiddleware);

// db import
const { prisma } = require("../lib/prisma");

// class import
const TaskRepository = require("../repositories/task.repository");
const TaskService = require("../services/task.service");
const TaskController = require("../controllers/task.controller");

// dependencies
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// routes
router.post("/add", taskMiddleware, taskController.createTask);

module.exports = router;
