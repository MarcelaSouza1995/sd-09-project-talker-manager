const { message } = require('../services');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /[\w\D]{6}/g.test(password);
  if (!password) return res.status(400).json({ message: message.emptyPassword });
  if (!passwordRegex) return res.status(400).json({ message: message.invalidPassword });
  next();
};

module.exports = checkPassword;
