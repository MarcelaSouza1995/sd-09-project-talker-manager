const crypto = require('crypto');

const emailValidator = (email, res) => {
  const emailRegex = new RegExp('^[a-z0-9.]+@[a-z0-9]+.[a-z]+');

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordValidator = (password, res) => {
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const login = (req, res) => {
  const { email, password } = req.body;
  emailValidator(email, res);
  passwordValidator(password, res);
  const token = tokenGenerator();
  console.log('Login: ');
  return res.status(200).json({ token });
};

module.exports = login;
