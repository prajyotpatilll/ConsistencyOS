const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["custom", "dsa", "job", "interview"],
      default: "custom",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // If true, this task repeats every day instead of being a one-off
    // tied to a single dueDate. Completion is then tracked per-day
    // via completedDates rather than the single `completed` flag.
    isRecurring: {
      type: Boolean,
      default: false,
    },
    // Dates (stored as 'YYYY-MM-DD' strings) on which this recurring
    // task was marked complete. Only used when isRecurring is true.
    completedDates: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, dueDate: 1 });

module.exports = mongoose.model("Task", taskSchema);
