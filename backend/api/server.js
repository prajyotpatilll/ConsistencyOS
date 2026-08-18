require("dotenv").config();

const express = require("express");
const cors = require("cors");


const authRoutes = require("../src/routes/auth.routes");
const taskRoutes = require("../src/routes/task.routes");
const dsaRoutes = require("../src/routes/dsa.routes");
const jobRoutes = require("../src/routes/job.routes");
const interviewRoutes = require("../src/routes/interview.routes");
const dashboardRoutes = require("../src/routes/dashboard.routes");

const { notFound, errorHandler } = require("../src/middleware/error.middleware");
const connectDB = require("../src/config/db");

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "https://consistency-os-weld.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

connectDB();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Career Tracker API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Career Tracker API running on port ${PORT}`);
});

module.exports = app;