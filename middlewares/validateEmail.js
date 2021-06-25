const validateEmail = (req, res, next) => {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (req.body.email === undefined) {
    return next(res.status(400).send({ message: 'O campo "email" é obrigatório' }));
  }

  if (req.body.email.length === 0) {
    return next(res.status(400).send({ message: 'O campo "email" é obrigatório' }));
  }

  if (!regex.test(req.body.email)) {
    return next(res.status(400).send(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    ));
  }
};

module.exports = validateEmail;
