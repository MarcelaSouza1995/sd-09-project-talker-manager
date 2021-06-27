const generateToken = require('../services/generateToken');

const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  const isEmailValid = /^\w+@\w+.\w{2,3}$/.test(email);
  if (!isEmailValid) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const createLoginToken = (_req, res) => {
  const token = generateToken();
  return res
    .status(OK_STATUS)
    .json({ token });
};

module.exports = {
  validateEmail,
  validatePassword,
  createLoginToken,
};