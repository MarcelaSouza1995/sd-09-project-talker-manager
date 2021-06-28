const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs').promises;
const rescue = require('express-rescue');
const crypto = require('crypto');
const talkerFunc = require('./talkerFunc');
const validate = require('./validateFunc');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// requisito 7
app.get('/talker/search', validate.validationToken, rescue(async (req, res, _next) => {
  const { q } = req.query;
  const talkers = await talkerFunc.readTalker();
  if (!q || q.length === 0) return res.status(HTTP_OK_STATUS).json(talkers);
  const newTalker = talkers.filter((talker) => talker.name.includes(q));
  return res.status(HTTP_OK_STATUS).json({ newTalker });
}));

// requisito 1
app.get('/talker', rescue(async (req, res) => {
  const talkers = await talkerFunc.readTalker();
  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
}));
// requisito 2
app.get('/talker/:id', rescue(async (req, res) => {
  const talkers = await talkerFunc.readTalker();
  const { id } = req.params;
  const talkerById = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerById);
}));
// requisito 3
app.post('/login', validate.validationEmailAndPassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});
// requisito 4
app.use(validate.validationToken);
app.post('/talker',
  validate.validationNameAndAge,
  validate.validationTalk,
  validate.validatorWatchedAtAndRate,
  rescue(async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await talkerFunc.readTalker();
    const newTalker = { id: talkers.length + 1, name, age, talk };
    const newRead = [...talkers, newTalker];
    await talkerFunc.writeTalker(newRead);
    return res.status(201).json(newTalker);
  }));
// requisito 5
app.put('/talker/:id',
validate.validationNameAndAge,
validate.validationTalk,
validate.validatorWatchedAtAndRate,
  rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await talkerFunc.readTalker();
  const indexTalker = talkers.findIndex((talker) => talker.id === id);
  const newTalker = { id: Number(id), name, age, talk };
  talkers.splice(indexTalker, 1, newTalker);
  await talkerFunc.writeTalker(talkers);
  return res.status(200).json(newTalker);
}));
// requisito 6
app.delete('/talker/:id', rescue(async (req, res, _next) => {
  const { id } = req.params;
  const talkers = await talkerFunc.readTalker();
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await talkerFunc.writeTalker(newTalkers);
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

app.listen(PORT, () => {
  console.log('Online');
});
