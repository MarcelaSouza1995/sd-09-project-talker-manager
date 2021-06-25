const crypto = require('crypto');
const { errorMessages } = require('../services');

const login = (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  const passwordFormat = /[\w\D]{6}/g.test(password);
  if (!email) res.status(400).json({ message: errorMessages.login.noEmail });
  if (!emailFormat) res.status(400).json({ message: errorMessages.login.invalidEmail });
  if (!password) res.status(400).json({ message: errorMessages.login.noPassword });
  if (!passwordFormat) res.status(400).json({ message: errorMessages.login.invalidPassword });
  res.status(200).json({ token });
};

module.exports = login;
