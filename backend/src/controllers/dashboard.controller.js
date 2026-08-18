const Task = require("../models/Task");
const DSAProblem = require("../models/DSAProblem");
const JobApplication = require("../models/JobApplication");
const InterviewPreparation = require("../models/InterviewPreparation");
const { getTodayDateString, getTodayRange } = require("../utils/dateUtils");

/**
 * @route   GET /api/dashboard
 * @desc    Aggregate today's stats + recent activity for the authenticated user
 * @access  Private
 */
const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user;
    const todayRange = getTodayRange();
    const todayStr = getTodayDateString();

    // Today's task list = one-time tasks due today + every recurring task
    // (recurring tasks apply every day, so they're always "today's tasks").
    const [oneTimeToday, recurringTasks, dsaToday, jobsToday, interviewToday] =
      await Promise.all([
        Task.find({
          user: userId,
          isRecurring: { $ne: true },
          dueDate: todayRange,
        }),
        Task.find({ user: userId, isRecurring: true }),
        DSAProblem.find({ user: userId, solvedAt: todayRange }),
        JobApplication.find({ user: userId, appliedAt: todayRange }),
        InterviewPreparation.find({ user: userId, preparedAt: todayRange }),
      ]);

    const todayTasks = [
      ...oneTimeToday.map((t) => ({ completedToday: t.completed })),
      ...recurringTasks.map((t) => ({
        completedToday: t.completedDates.includes(todayStr),
      })),
    ];

    const totalTasks = todayTasks.length;
    const completedTasks = todayTasks.filter((t) => t.completedToday).length;
    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const interviewMinutes = interviewToday.reduce(
      (sum, session) => sum + (session.duration || 0),
      0
    );

    // Recent activity: latest 5 items across all collections
    const [recentDSA, recentJobs, recentInterview, recentOneTimeTasks] =
      await Promise.all([
        DSAProblem.find({ user: userId }).sort({ createdAt: -1 }).limit(5),
        JobApplication.find({ user: userId }).sort({ createdAt: -1 }).limit(5),
        InterviewPreparation.find({ user: userId })
          .sort({ createdAt: -1 })
          .limit(5),
        Task.find({ user: userId, isRecurring: { $ne: true }, completed: true })
          .sort({ updatedAt: -1 })
          .limit(5),
      ]);

    // Recurring tasks completed today also count as recent activity.
    const recentRecurringDoneToday = recurringTasks
      .filter((t) => t.completedDates.includes(todayStr))
      .slice(0, 5);

    const activity = [
      ...recentDSA.map((item) => ({
        type: "dsa",
        message: `Solved ${item.problemName}`,
        date: item.createdAt,
      })),
      ...recentJobs.map((item) => ({
        type: "job",
        message: `Applied to ${item.companyName}`,
        date: item.createdAt,
      })),
      ...recentInterview.map((item) => ({
        type: "interview",
        message: `Studied ${item.topic}`,
        date: item.createdAt,
      })),
      ...recentOneTimeTasks.map((item) => ({
        type: "task",
        message: `Completed "${item.title}"`,
        date: item.updatedAt,
      })),
      ...recentRecurringDoneToday.map((item) => ({
        type: "task",
        message: `Completed "${item.title}" (daily)`,
        date: item.updatedAt,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);

    res.status(200).json({
      success: true,
      today: {
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          progress,
        },
        dsaSolved: dsaToday.length,
        jobApplications: jobsToday.length,
        interviewPreparation: {
          sessions: interviewToday.length,
          minutes: interviewMinutes,
        },
      },
      recentActivity: activity,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
