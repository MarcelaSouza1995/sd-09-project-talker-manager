const { errorMessage } = require('../services');

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordFormat = /[\w\D]{6}/g.test(password);
  if (!password) res.status(400).json({ message: errorMessage.emptyPassword });
  if (!passwordFormat) res.status(400).json({ message: errorMessage.invalidPassword });
  next();
};

module.exports = validatePassword;
