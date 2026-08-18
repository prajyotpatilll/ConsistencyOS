const Task = require("../models/Task");
const { getTodayDateString, getTodayRange } = require("../utils/dateUtils");

/**
 * Adds a computed `completedToday` boolean to a task so the frontend
 * has one consistent field to check regardless of task type:
 * - Recurring tasks: true if today's date is in completedDates.
 * - One-time tasks: mirrors the `completed` flag.
 */
const withCompletedToday = (task) => {
  const obj = task.toObject ? task.toObject() : task;
  const todayStr = getTodayDateString();
  const completedToday = obj.isRecurring
    ? obj.completedDates.includes(todayStr)
    : obj.completed;

  return { ...obj, completedToday };
};

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for the authenticated user
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const filter = { user: req.user };

    if (category) filter.category = category;

    let tasks = await Task.find(filter).sort({ createdAt: -1 });
    tasks = tasks.map(withCompletedToday);

    // Filter on the computed completedToday so recurring tasks behave
    // correctly (a recurring task "completed" yesterday but not today
    // should show up under "pending" today).
    if (status === "completed") tasks = tasks.filter((t) => t.completedToday);
    if (status === "pending") tasks = tasks.filter((t) => !t.completedToday);

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/tasks/today
 * @desc    Get tasks relevant to today: one-time tasks due today,
 *          plus every recurring task (since those apply daily).
 * @access  Private
 */
const getTodayTasks = async (req, res, next) => {
  try {
    const [oneTimeToday, recurring] = await Promise.all([
      Task.find({
        user: req.user,
        isRecurring: { $ne: true },
        dueDate: getTodayRange(),
      }),
      Task.find({ user: req.user, isRecurring: true }),
    ]);

    const tasks = [...oneTimeToday, ...recurring]
      .map(withCompletedToday)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/tasks
 * @desc    Create a task (optionally recurring/repeats daily)
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, category, priority, dueDate, isRecurring } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const task = await Task.create({
      user: req.user,
      title,
      description,
      category,
      priority,
      // Recurring tasks don't need a specific dueDate — they apply every day.
      dueDate: isRecurring ? undefined : dueDate,
      isRecurring: Boolean(isRecurring),
    });

    res.status(201).json({ success: true, task: withCompletedToday(task) });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      category,
      priority,
      dueDate,
      completed,
      isRecurring,
    } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    if (isRecurring !== undefined) {
      task.isRecurring = isRecurring;
      // Switching a task's type resets its completion tracking so the
      // two modes never mix stale state.
      if (isRecurring) {
        task.dueDate = undefined;
        task.completed = false;
      } else {
        task.completedDates = [];
      }
    }

    await task.save();

    res.status(200).json({ success: true, task: withCompletedToday(task) });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/tasks/:id/complete
 * @desc    Toggle / mark a task completed.
 *          For recurring tasks this toggles *today's* completion only,
 *          so the task naturally resets the next day.
 * @access  Private
 */
const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const todayStr = getTodayDateString();

    if (task.isRecurring) {
      const alreadyDoneToday = task.completedDates.includes(todayStr);
      // If the client sends an explicit boolean, honor it; otherwise toggle.
      const shouldBeDone =
        typeof req.body.completed === "boolean"
          ? req.body.completed
          : !alreadyDoneToday;

      if (shouldBeDone && !alreadyDoneToday) {
        task.completedDates.push(todayStr);
      } else if (!shouldBeDone && alreadyDoneToday) {
        task.completedDates = task.completedDates.filter(
          (d) => d !== todayStr
        );
      }
    } else if (typeof req.body.completed === "boolean") {
      task.completed = req.body.completed;
    } else {
      task.completed = !task.completed;
    }

    await task.save();

    res.status(200).json({ success: true, task: withCompletedToday(task) });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTodayTasks,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
};
