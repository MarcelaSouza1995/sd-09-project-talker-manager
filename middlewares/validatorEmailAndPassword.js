const validatorEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;

  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validatorEmailAndPassword;
