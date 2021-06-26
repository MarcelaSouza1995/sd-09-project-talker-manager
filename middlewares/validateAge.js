const { errorMessage } = require('../services');

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) res.status(400).json({ message: errorMessage.emptyAge });
  if (age < 18) res.status(400).json({ message: errorMessage.invalidAge });
  next();
};

module.exports = validateAge;
