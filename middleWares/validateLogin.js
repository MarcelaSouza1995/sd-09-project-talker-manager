const { validateEmail, validatePassword } = require('../auxiliarFunctions/index');

const validadeLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
  if (!password) { return res.status(400).json({ message: 'O campo "password" é obrigatório' }); }

  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  if (!emailValidation) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!passwordValidation) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validadeLogin;
