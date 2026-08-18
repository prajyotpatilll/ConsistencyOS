const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    platform: {
      type: String,
      enum: [
        "LinkedIn",
        "Naukri",
        "Indeed",
        "Company Website",
        "Referral",
        "Internshala",
        "Other",
      ],
      default: "LinkedIn",
    },
    jobUrl: {
      type: String,
      trim: true,
      default: "",
    },
    recruiterEmail: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "applied",
        "oa",
        "interview",
        "final_round",
        "offer",
        "rejected",
        "withdrawn",
      ],
      default: "applied",
    },
    appliedAt: {
      type: Date,
      required: [true, "Applied date is required"],
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

jobApplicationSchema.index({ user: 1, appliedAt: 1 });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
