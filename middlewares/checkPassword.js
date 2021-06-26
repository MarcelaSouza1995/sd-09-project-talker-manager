const { errorMessage } = require('../services');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /[\w\D]{6}/g.test(password);
  if (!password) res.status(400).json({ message: errorMessage.emptyPassword });
  if (!passwordRegex) res.status(400).json({ message: errorMessage.invalidPassword });
  next();
};

module.exports = checkPassword;
