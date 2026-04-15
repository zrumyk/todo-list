const express = require('express');
const router = express.Router();

// schema
const { usersSchema } = require('../../schemas');

// middleWare
const authMiddleware = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');

// db init
const { prisma } = require('../../lib/prisma');

// class import
const UserRepository = require('../../repositories/user.repository');
const UserService = require('../../services/user.service');
const UserController = require('../../controllers/user.controller');

// dependency injection
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// routes
router.patch(
  '/update',
  authMiddleware,
  validate(usersSchema.update),
  userController.update
);
router.delete('/delete', authMiddleware, userController.delete);

module.exports = router;
