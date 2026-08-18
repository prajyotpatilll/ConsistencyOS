const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const dsaRoutes = require("./routes/dsa.routes");
const jobRoutes = require("./routes/job.routes");
const interviewRoutes = require("./routes/interview.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(cors({
  origin: [
    "https://consistency-os-weld.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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

module.exports = app;