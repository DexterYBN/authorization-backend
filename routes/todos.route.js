const { todosController } = require("../controllers/todos.controllers");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/todos", authMiddleware, todosController.getAllTodos);
router.post("/todos", authMiddleware, todosController.createTodo);
router.delete("/todos/:id", authMiddleware, todosController.deleteTodo);

module.exports = router;
