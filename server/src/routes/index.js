const express = require('express');
const router = express.Router();

// routes import
const userRoutes = require('./di/user.routes');
const taskRoutes = require('./di/task.routes');
const authRoutes = require('./di/auth.routes');

// global router
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/auth', authRoutes);

module.exports = router;
