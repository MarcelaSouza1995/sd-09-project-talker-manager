const { emailValidator, passwordValidator } = require('../util/validationFunctions');

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!emailValidator(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato \'email@email.com\'' });
  }
  if (!passwordValidator(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = loginValidator;