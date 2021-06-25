const validatorName = (name, res) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validatorAge = (age, res) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validatorWatchedAt = (watchedAt, res) => {
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validatorRate = (rate, res) => {
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validatorTalk = (talk, req, res) => {
  if ((!talk || !talk.watchedAt) || (Number.isNaN(+talk.rate))) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  validatorWatchedAt(talk.watchedAt, res);
  validatorRate(talk.rate, res);
};

const validatorTalker = (req, res, next) => {
  const { name, age, talk } = req.body;

  validatorName(name, res);
  validatorAge(age, res);
  validatorTalk(talk, req, res);
  
  return next();
};

module.exports = validatorTalker;
