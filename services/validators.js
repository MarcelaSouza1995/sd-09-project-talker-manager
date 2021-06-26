const emailValidator = (request, response, next) => {
  const { body: { email } } = request;
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const emailTester = emailRegex.test(email);
  if (!email || email.length === 0) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailTester) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidator = (request, response, next) => {
  const { body: { password } } = request;

  if (!password || password.length === 0) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenValidator = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidator = (request, response, next) => {
  const { name } = request.body;
  if (!name || name.length === 0) {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidator = (request, response, next) => {
  const { age } = request.body;
  if (!age || age.length === 0) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const watchedAtValidator = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;

  const dateRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);
  if (!watchedAt) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!dateRegex.test(watchedAt)) {
    return response.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidator = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const talkValidator = (request, response, next) => {
  const { talk } = request.body;
  if (((!talk || !talk.watchedAt) || (!talk.rate && talk.rate !== 0))) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = {
  emailValidator,
  passwordValidator,
  tokenValidator,
  nameValidator,
  ageValidator,
  watchedAtValidator,
  rateValidator,
  talkValidator,
};
