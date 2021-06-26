const { message } = require('../services');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) return res.status(400).json({ message: message.emptyEmail });
  if (!emailRegex) return res.status(400).json({ message: message.invalidEmail });
  next();
};

module.exports = checkEmail;
