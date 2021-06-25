function validateEmail(req, res, next) {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const emailRegex = /^([\w\\.\\-]+)@([\w\\-]+)((\.(\w){2,3})+)$/;
  const regexTest = emailRegex.test(email);
  
  if (!regexTest) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

module.exports = validateEmail;
