const crypto = require('crypto');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password) => {
  if (password.length > 6) {
    return true;
  }
  return false;
};

const generateToken = (req, res, _next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  const emailStatus = validateEmail(email);
  if (!emailStatus) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  const passwordStatus = validatePassword(password);
  if (!passwordStatus) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const myToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: myToken });
};

module.exports = generateToken;
