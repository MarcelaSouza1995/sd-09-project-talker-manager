const emailAuthentication = () => (req, _res, next) => {
  const { email } = req.body;
  const errorType = 400;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    return next({
      errorType,
      message: 'O campo "email" é obrigatório',
    });
  } 

  if (!email.match(emailRegex)) {
    return next({
      errorType,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const passwordAuthentication = () => (req, _res, next) => {
  const { password } = req.body;
  const errorType = 400;

  if (!password) {
    return next({
      errorType,
      message: 'O campo "password" é obrigatório',
  });
  } 

  if (password.length < 6) {
    return next({
      errorType,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const tokenAuthentication = () => (req, _res, next) => {
  const { authorization } = req.headers;
  const errorType = 401;

  if (!authorization) return next({ errorType, message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    return next({ errorType, message: 'Token inválido' });
  }

  next();
};

const nameAuthentication = () => (req, _res, next) => {
  const { name } = req.body;
  const errorType = 400;

  if (!name) {
    return next({ errorType, message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return next({
      errorType,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const ageAuthentication = () => (req, _res, next) => {
  const { age } = req.body;
  const errorType = 400;

  if (!age) {
    return next({ errorType, message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return next({
      errorType,
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const talkAuthentication = () => (req, _res, next) => {
  const { talk } = req.body;
  const errorType = 400;

  if (!talk) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const watchedAtAuthentication = () => (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;
  const errorType = 400;
  const dateFormatRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!watchedAt) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!watchedAt.match(dateFormatRegex)) {
    return next({
      errorType,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const rateAuthentication = () => (req, _res, next) => {
  const { talk: { rate } } = req.body;
  const errorType = 400;
  if (rate === undefined) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (rate < 1 || rate > 5 || rate !== Math.round(rate)) {
    return next({
      errorType,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const handleErrorMiddleware = () => (err, _req, res, _next) => {
  res.status(err.errorType).json({ message: err.message });
};

module.exports = {
  emailAuthentication,
  passwordAuthentication,
  tokenAuthentication,
  nameAuthentication,
  ageAuthentication,
  talkAuthentication,
  watchedAtAuthentication,
  rateAuthentication,
  handleErrorMiddleware,
};
