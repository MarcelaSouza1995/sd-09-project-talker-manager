const { message } = require('../services');

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: message.emptyAge });
  if (age < 18) return res.status(400).json({ message: message.invalidAge });
  next();
};

module.exports = checkAge;
