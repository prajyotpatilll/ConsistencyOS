const express = require("express");
const router = express.Router();
const {
  getProblems,
  getTodayProblems,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/dsa.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/", getProblems);
router.get("/today", getTodayProblems);
router.post("/", createProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

module.exports = router;
