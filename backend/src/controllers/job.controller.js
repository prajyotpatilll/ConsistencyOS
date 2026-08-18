const JobApplication = require("../models/JobApplication");

/**
 * @route   GET /api/jobs
 * @desc    Get all job applications for the authenticated user
 * @access  Private
 */
const getApplications = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { user: req.user };
    if (status) filter.status = status;

    const applications = await JobApplication.find(filter).sort({
      appliedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/jobs
 * @desc    Create a job application
 * @access  Private
 */
const createApplication = async (req, res, next) => {
  try {
    const {
      companyName,
      position,
      platform,
      jobUrl,
      recruiterEmail,
      location,
      status,
      appliedAt,
      notes,
    } = req.body;

    if (!companyName || !position) {
      return res.status(400).json({
        success: false,
        message: "Company name and position are required",
      });
    }

    const application = await JobApplication.create({
      user: req.user,
      companyName,
      position,
      platform,
      jobUrl,
      recruiterEmail,
      location,
      status,
      appliedAt,
      notes,
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job application
 * @access  Private
 */
const updateApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    const fields = [
      "companyName",
      "position",
      "platform",
      "jobUrl",
      "recruiterEmail",
      "location",
      "status",
      "appliedAt",
      "notes",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        application[field] = req.body[field];
      }
    });

    await application.save();

    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job application
 * @access  Private
 */
const deleteApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({ success: true, message: "Application deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
};
