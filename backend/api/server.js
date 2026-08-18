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

const corsOptions = {
  origin: [
    "https://consistency-os-weld.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
// ❌ removed: app.options("*", cors(corsOptions));
// cors() above already handles preflight OPTIONS requests for all routes.
// The bare "*" wildcard crashes on newer path-to-regexp/Express versions.

app.use(express.json());

// Ensure DB is connected before handling each request (cached, so it only
// actually connects once per warm container — see connectDB below)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

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

// ✅ only listen locally — Vercel imports `app` and handles requests itself
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Career Tracker API running on port ${PORT}`);
  });
}

module.exports = app;