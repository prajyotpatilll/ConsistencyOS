const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT containing the user's id.
 * @param {string} userId - Mongo ObjectId of the user
 * @returns {string} signed JWT, expires in 7 days
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
