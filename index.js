const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./generateToken');
const validateEmail = require('./validateEmail');
const validateDate = require('./validateDate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILE_PATH = './talker.json';

const authenticationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).send({ message: 'Token inválido' });
  return next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(FILE_PATH, 'utf-8').then((response) => (
    response ? res.status(200).send(JSON.parse(response)) : res.status(200).send([])
  ));
});

app.get('/talker/search', authenticationMiddleware, async (req, res) => {
  const { q } = req.query;
  const talkerArray = await fs.readFile(FILE_PATH, 'utf-8')
    .then((response) => JSON.parse(response));
  const talkers = talkerArray.filter((talker) => talker.name.includes(q));
  return res.status(200).send(talkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(FILE_PATH, 'utf-8').then((response) => {
    const talker = JSON.parse(response).find((talkerObj) => talkerObj.id === Number(id));
    return talker
      ? res.status(200).send(talker)
      : res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  });
});

app.post('/login', (req, res) => {
  const token = generateToken();
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).send({ token });
});

app.use(authenticationMiddleware);

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};

const talkDateValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!validateDate(talk.watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const talkRateValidation = (req, res, next) => {
  const { talk } = req.body;
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res
      .status(400)
      .send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  return next();
};

app.post(
  '/talker',
  nameValidation,
  ageValidation,
  talkValidation,
  talkDateValidation,
  talkRateValidation,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const oldArray = await fs.readFile(FILE_PATH, 'utf-8')
      .then((response) => JSON.parse(response));
    fs.writeFile(
      FILE_PATH, JSON.stringify([...oldArray, { id: oldArray.length + 1, name, age, talk }]),
      ).then(() => res.status(201).send({ id: oldArray.length + 1, name, age, talk }));
  },
);

app.put(
  '/talker/:id',
  nameValidation,
  ageValidation,
  talkValidation,
  talkDateValidation,
  talkRateValidation,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talker = await fs.readFile(FILE_PATH, 'utf-8')
      .then((response) => JSON.parse(response))
      .then((response) => response.find((talkerObj) => talkerObj.id === Number(id)));
    const talkerArray = await fs.readFile(FILE_PATH, 'utf-8')
      .then((response) => JSON.parse(response))
      .then((response) => response.filter((talkerObj) => talkerObj.id !== Number(id)));
    talker.name = name;
    talker.age = age;
    talker.talk = talk;
    fs.writeFile(
      FILE_PATH, JSON.stringify([...talkerArray, talker]),
      ).then(() => res.status(200).send({ id: Number(id), name, age, talk }));
  },
);

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerArray = await fs.readFile(FILE_PATH, 'utf-8')
    .then((response) => JSON.parse(response))
    .then((response) => response.filter((talkerObj) => talkerObj.id !== Number(id)));
  fs.writeFile(
    FILE_PATH, JSON.stringify([...talkerArray]),
    ).then(() => res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' }));
});

app.listen(PORT, () => {
  console.log('Online');
});
