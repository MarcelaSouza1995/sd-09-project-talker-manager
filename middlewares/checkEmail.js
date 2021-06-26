const { errorMessage } = require('../services');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) res.status(400).json({ message: errorMessage.emptyEmail });
  if (!emailRegex) res.status(400).json({ message: errorMessage.invalidEmail });
  next();
};

module.exports = checkEmail;
