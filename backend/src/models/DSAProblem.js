const mongoose = require("mongoose");

const dsaProblemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemName: {
      type: String,
      required: [true, "Problem name is required"],
      trim: true,
    },
    platform: {
      type: String,
      enum: [
        "LeetCode",
        "GeeksForGeeks",
        "CodeChef",
        "Codeforces",
        "HackerRank",
        "Other",
      ],
      default: "LeetCode",
    },
    problemUrl: {
      type: String,
      trim: true,
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty is required"],
    },
    dataStructure: {
      type: String,
      trim: true,
      default: "",
    },
    algorithm: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    solvedAt: {
      type: Date,
      required: [true, "Solved date is required"],
      default: Date.now,
    },
    timeTaken: {
      type: Number, // minutes
      default: 0,
    },
  },
  { timestamps: true }
);

dsaProblemSchema.index({ user: 1, solvedAt: 1 });

module.exports = mongoose.model("DSAProblem", dsaProblemSchema);
