const express = require("express");
const router = express.Router();
const {
  getPreparations,
  createPreparation,
  updatePreparation,
  deletePreparation,
} = require("../controllers/interview.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/", getPreparations);
router.post("/", createPreparation);
router.put("/:id", updatePreparation);
router.delete("/:id", deletePreparation);

module.exports = router;
