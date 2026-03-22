const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const userMiddleware = require("../middleware/zod/user.middleware");

// db init
const { prisma } = require("../lib/prisma");

// class import
const UserRepository = require("../repositories/user.repository");
const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");

// dependencies
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// routes
router.post("/register", userMiddleware, userController.register);
router.post("/login", userController.login);

router.get("/user", authMiddleware, userController.getUser);

router.patch("/update/username", authMiddleware, userController.changeName);
router.patch("/update/password", authMiddleware, userController.changePassword);

module.exports = router;
