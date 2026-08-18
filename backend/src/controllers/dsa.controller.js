const DSAProblem = require("../models/DSAProblem");

/**
 * @route   GET /api/dsa
 * @desc    Get all DSA problems for the authenticated user
 * @access  Private
 */
const getProblems = async (req, res, next) => {
  try {
    const problems = await DSAProblem.find({ user: req.user }).sort({
      solvedAt: -1,
    });

    res
      .status(200)
      .json({ success: true, count: problems.length, problems });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/dsa/today
 * @desc    Get problems solved today
 * @access  Private
 */
const getTodayProblems = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const problems = await DSAProblem.find({
      user: req.user,
      solvedAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ solvedAt: -1 });

    res
      .status(200)
      .json({ success: true, count: problems.length, problems });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/dsa
 * @desc    Add a solved DSA problem
 * @access  Private
 */
const createProblem = async (req, res, next) => {
  try {
    const {
      problemName,
      platform,
      problemUrl,
      difficulty,
      dataStructure,
      algorithm,
      notes,
      solvedAt,
      timeTaken,
    } = req.body;

    if (!problemName || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Problem name and difficulty are required",
      });
    }

    const problem = await DSAProblem.create({
      user: req.user,
      problemName,
      platform,
      problemUrl,
      difficulty,
      dataStructure,
      algorithm,
      notes,
      solvedAt,
      timeTaken,
    });

    res.status(201).json({ success: true, problem });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/dsa/:id
 * @desc    Update a DSA problem
 * @access  Private
 */
const updateProblem = async (req, res, next) => {
  try {
    const problem = await DSAProblem.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "DSA problem not found",
      });
    }

    const fields = [
      "problemName",
      "platform",
      "problemUrl",
      "difficulty",
      "dataStructure",
      "algorithm",
      "notes",
      "solvedAt",
      "timeTaken",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        problem[field] = req.body[field];
      }
    });

    await problem.save();

    res.status(200).json({ success: true, problem });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/dsa/:id
 * @desc    Delete a DSA problem
 * @access  Private
 */
const deleteProblem = async (req, res, next) => {
  try {
    const problem = await DSAProblem.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "DSA problem not found",
      });
    }

    res.status(200).json({ success: true, message: "Problem deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProblems,
  getTodayProblems,
  createProblem,
  updateProblem,
  deleteProblem,
};
