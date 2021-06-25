const nameRes = (req, res) => {
  if (!req.body.name || req.body.name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (req.body.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const ageRes = (req, res) => {
  if (!req.body.age || req.body.age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(req.body.age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validateData = (date) => {
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return patternData.test(date);
};

const talkRes = (req, res) => {
  if (!req.body.talk || !req.body.talk.watchedAt || !req.body.talk.rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
};

const talkDataRes = (req, res) => {
  if (!validateData(req.body.talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number(req.body.talk.rate) < 1 || Number(req.body.talk.rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 a 5' });
  }
};

const talkerValidation = (req, res, next) => {
  nameRes(req, res);
  ageRes(req, res);
  talkRes(req, res);
  talkDataRes(req, res);
  next();
};

module.exports = talkerValidation;
