const { errorMessage } = require('../services');

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: errorMessage.emptyAge });
  if (age < 18) return res.status(400).json({ message: errorMessage.invalidAge });
  next();
};

module.exports = checkAge;
