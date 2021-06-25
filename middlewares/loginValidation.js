function validateEmail(email) {
  const patternEmail = /\S+@\S+\.\S+/;
  return patternEmail.test(email);
}

const validatePassword = (password) => {
  if (Number(password) && password.length >= 6) return true;
  return false;
};

const emailRes = (req, res) => {
  if (!req.body.email || req.body.email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const passwordRes = (req, res) => {
  if (!req.body.password || req.body.password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(req.body.password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const loginValidation = (req, res, next) => {
  emailRes(req, res);
  passwordRes(req, res);

  next();
};

module.exports = loginValidation;