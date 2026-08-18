const InterviewPreparation = require("../models/InterviewPreparation");

/**
 * @route   GET /api/interview
 * @desc    Get preparation history for the authenticated user
 * @access  Private
 */
const getPreparations = async (req, res, next) => {
  try {
    const preparations = await InterviewPreparation.find({
      user: req.user,
    }).sort({ preparedAt: -1 });

    res.status(200).json({
      success: true,
      count: preparations.length,
      preparations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/interview
 * @desc    Create a preparation session
 * @access  Private
 */
const createPreparation = async (req, res, next) => {
  try {
    const {
      category,
      language,
      topic,
      subTopic,
      duration,
      notes,
      preparedAt,
    } = req.body;

    if (!category || !topic) {
      return res.status(400).json({
        success: false,
        message: "Category and topic are required",
      });
    }

    const preparation = await InterviewPreparation.create({
      user: req.user,
      category,
      language,
      topic,
      subTopic,
      duration,
      notes,
      preparedAt,
    });

    res.status(201).json({ success: true, preparation });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/interview/:id
 * @desc    Update a preparation session
 * @access  Private
 */
const updatePreparation = async (req, res, next) => {
  try {
    const preparation = await InterviewPreparation.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!preparation) {
      return res.status(404).json({
        success: false,
        message: "Preparation session not found",
      });
    }

    const fields = [
      "category",
      "language",
      "topic",
      "subTopic",
      "duration",
      "notes",
      "preparedAt",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        preparation[field] = req.body[field];
      }
    });

    await preparation.save();

    res.status(200).json({ success: true, preparation });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/interview/:id
 * @desc    Delete a preparation session
 * @access  Private
 */
const deletePreparation = async (req, res, next) => {
  try {
    const preparation = await InterviewPreparation.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!preparation) {
      return res.status(404).json({
        success: false,
        message: "Preparation session not found",
      });
    }

    res.status(200).json({ success: true, message: "Preparation deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPreparations,
  createPreparation,
  updatePreparation,
  deletePreparation,
};
