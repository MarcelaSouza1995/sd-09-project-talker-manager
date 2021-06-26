const emailValidator = require('email-validator');

const checkEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  const PWRD_LENGTH = 6;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (emailValidator.validate(email) !== true) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < PWRD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = checkEmailAndPassword;
