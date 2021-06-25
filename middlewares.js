const loginAuthentication = (req, res, next) => {
  const { body: { email, password } } = req;
  const emailRegex = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
  const emailIsOk = emailRegex.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailIsOk) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.toString().length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  loginAuthentication,
};
