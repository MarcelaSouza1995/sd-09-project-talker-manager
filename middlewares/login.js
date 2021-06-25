const crypto = require('crypto');

const validatorEmail = (email, res) => {
  const regexEmail = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+');

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatorPassword = (password, res) => {
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const login = (req, res, _next) => {
  const { email, password } = req.body;

  validatorEmail(email, res);
  validatorPassword(password, res);

  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
};

module.exports = login;
