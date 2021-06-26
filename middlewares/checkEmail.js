const { errorMessage } = require('../services');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) return res.status(400).json({ message: errorMessage.emptyEmail });
  if (!emailRegex) return res.status(400).json({ message: errorMessage.invalidEmail });
  next();
};

module.exports = checkEmail;
