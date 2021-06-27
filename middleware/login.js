const crypto = require('crypto');
const { verifyEmail, verifyPassword } = require('../validation');

const validations = (req, res, next) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const passwordIsValid = verifyPassword(password);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!passwordIsValid) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const login = (req, res) => {
  const { email, password } = req.body;
    req.body.token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ email, password });
};

module.exports = { login, validations };