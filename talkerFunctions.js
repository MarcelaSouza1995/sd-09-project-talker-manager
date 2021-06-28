const fs = require('fs').promises;

const talker = './talker.json';
const readFile = async () => {
  const talkersData = await fs.readFile(talker, 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(talkersData);
};

const getData = async () => {
  const talkersData = await readFile();
  if (!talkersData.length) throw new Error('Nenhum palestrante encontrado');
  return talkersData;
};

const addTalker = (body, talkersData) => {
  const newTalker = {
    name: body.name,
    age: body.age,
    id: talkersData.length + 1,
    talk: {
      watchedAt: body.talk.watchedAt,
      rate: body.talk.rate,
    },
  };
  return newTalker;
};

const getTalkerById = async (id) => {
  const talkersData = await getData();
  const desiredTalker = talkersData.find((person) => person.id === Number(id));
  if (!desiredTalker) throw new Error('Pessoa palestrante não encontrada');
  return desiredTalker;
};

const validateLogin = (email, password) => {
  const rgx = /[^@]+@[^.]+\.com/g;
  if (!email) throw new Error('O campo "email" é obrigatório');
  if (!password) throw new Error('O campo "password" é obrigatório');
  if (!rgx.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  if (password.length < 6) throw new Error('O "password" deve ter pelo menos 6 caracteres');
};

const validateNameAndAge = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const rgx = /\d{2}\/\d{2}\/\d{4}/;
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rgx.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  res.status(201);
  next();
};

const talkIsNotEmpty = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateNewTalker = async (req, res) => {
  const { body } = req;
  try {
    const talkers = await getData();
    const newTalker = await addTalker(body, talkers);
    await fs.writeFile('./talker.json', JSON.stringify([...talkers, newTalker]));
    res.status(201).json(newTalker);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getData,
  getTalkerById,
  validateLogin,
  validateNewTalker,
  validateNameAndAge,
  talkIsNotEmpty,
  validateTalk,
  validateToken,
};