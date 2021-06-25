const { v4 } = require('uuid');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');

const token = v4();
const validToken = token.split('-', 3).join('');

const login = (req, res, next) => {
  validateEmail(req, res, next);
  validatePassword(req, res, next);

  res.status(200).json({ token: validToken });
};

module.exports = login;