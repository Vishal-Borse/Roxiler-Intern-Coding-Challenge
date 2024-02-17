const validateMonth = (req, res, next) => {
  const months = new Set([
    "january",
    "febuary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]);


  if (months.has(req.query.month?.toLowerCase())) {
    next();
  } else {
    res.status(400).json({
      "status": "Month is not valid",
    });
  }
};

module.exports = validateMonth;
