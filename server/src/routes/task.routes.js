const express = require('express');
const router = express.Router();
const { tasksSchema } = require('../schemas');

const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

router.use(authMiddleware);

// db import
const { prisma } = require('../lib/prisma');

// class import
const TaskRepository = require('../repositories/task.repository');
const TaskService = require('../services/task.service');
const TaskController = require('../controllers/task.controller');

// dependencies
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// routes
router.post('/create', validate(tasksSchema.create), taskController.create);

router.get('/get/:id', taskController.find);
router.get('/get', taskController.findUserTasks);

router.patch(
    '/update/:id',
    validate(tasksSchema.update),
    taskController.update
);

router.delete('/delete/:id', taskController.delete);

module.exports = router;
