/**
 * Returns today's date as a 'YYYY-MM-DD' string, used as the key
 * for tracking recurring task completion per day.
 */
const getTodayDateString = () => new Date().toISOString().slice(0, 10);

/**
 * Returns the start and end of today as Date objects, used for
 * range queries (e.g. dueDate, solvedAt, appliedAt, preparedAt).
 */
const getTodayRange = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  return { $gte: startOfDay, $lte: endOfDay };
};

module.exports = { getTodayDateString, getTodayRange };
