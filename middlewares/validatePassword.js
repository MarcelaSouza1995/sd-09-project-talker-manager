const validatePassword = (req, res, next) => {
  if (req.body.password === undefined) {
    return next(res.status(400).send({ message: 'O campo "password" é obrigatório' }));
  }

  if (req.body.password.length === 0) {
    return next(res.status(400).send({ message: 'O campo "password" é obrigatório' }));
  }

  if (req.body.password.length < 6) {
    return next(res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' }));
  }
};

module.exports = validatePassword;
