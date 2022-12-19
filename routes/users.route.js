const { usersController } = require("../controllers/users.controllers");
const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/users", authMiddleware, usersController.getAllUsers);
router.post("/auth", usersController.registerUser);
router.post("/login", usersController.login);

module.exports = router;
