const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protects routes by verifying the JWT sent in the Authorization header.
 * On success, attaches the authenticated user's id to req.user.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. User no longer exists.",
      });
    }

    // Attach only the user's id, downstream code should never trust
    // a userId sent from the client.
    req.user = user._id;
    req.userDoc = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated. Invalid or expired token.",
    });
  }
};

module.exports = { protect };
