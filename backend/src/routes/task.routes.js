const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTodayTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
} = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/", getTasks);
router.get("/today", getTodayTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;
