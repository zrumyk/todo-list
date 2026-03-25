const express = require('express');
const router = express.Router();

// schema
const { usersSchema } = require('../../schemas');

// middleware
const validate = require('../../middleware/validate.middleware');

// db import
const { prisma } = require('../../lib/prisma');

// class import
const UserRepository = require('../../repositories/user.repository');
const AuthService = require('../../services/auth.service');
const AuthController = require('../../controllers/auth.controller');

// dependency injection
const userRepository = UserRepository(prisma);
const authService = AuthService(userRepository);
const authController = AuthController(authService);

// routes
router.post('/register', validate(usersSchema.create), authController.register);
router.post('/login', authController.login);

module.exports = router;
