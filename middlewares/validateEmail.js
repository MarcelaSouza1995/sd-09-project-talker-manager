const { errorMessage } = require('../services');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) res.status(400).json({ message: errorMessage.emptyEmail });
  if (!emailFormat) res.status(400).json({ message: errorMessage.invalidEmail });
  next();
};

module.exports = validateEmail;
