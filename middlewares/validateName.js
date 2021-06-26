const { errorMessage } = require('../services');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) res.status(400).json({ message: errorMessage.emptyName });
  if (name.length < 3) res.status(400).json({ message: errorMessage.invalidName });
  next();
};

module.exports = validateName;
