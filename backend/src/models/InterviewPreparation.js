const mongoose = require("mongoose");

const interviewPreparationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "DSA",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "DBMS",
        "OS",
        "Computer Networks",
        "System Design",
        "Behavioral",
        "Other",
      ],
      required: [true, "Category is required"],
    },
    language: {
      type: String,
      trim: true,
      default: "",
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    subTopic: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: Number, // minutes
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    preparedAt: {
      type: Date,
      required: [true, "Prepared date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

interviewPreparationSchema.index({ user: 1, preparedAt: 1 });

module.exports = mongoose.model(
  "InterviewPreparation",
  interviewPreparationSchema
);
