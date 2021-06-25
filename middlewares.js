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

const verifyToken = (req, res, next) => {
  const { headers: { authorization } } = req;
  const authRegex = /^[0-9a-zA-Z]{16}$/;
  const isValidade = authRegex.test(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!isValidade) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verifyName = (req, res, next) => {
  const { body: { name } } = req;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verifyAge = (req, res, next) => {
  const { body: { age } } = req;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyTalkExists = (req, res, next) => {
  const { body: { talk } } = req;
  const response = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (!talk) {
    return res.status(400).json({ message: response });
  }
  const { rate, watchedAt } = talk;
  if ((!rate && rate !== 0) || !watchedAt) {
    return res.status(400).json({ message: response });
  }
  next();
};

const verifyTalkContent = (req, res, next) => {
  const { body: { talk: { rate, watchedAt } } } = req;
  const dateRegex = /^\d\d\/\d\d\/\d\d\d\d$/;
  const watchedAtIsOk = dateRegex.test(watchedAt);
  if (!watchedAtIsOk) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  loginAuthentication,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalkExists,
  verifyTalkContent,
};
