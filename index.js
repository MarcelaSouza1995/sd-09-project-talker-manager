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
app.post('/login', validate.validationEmail, validate.validationPassword, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});
// requisito 4
app.use(validate.validationToken);
app.post('/talker',
  validate.validationName,
  validate.validationAge,
  validate.validationTalk,
  validate.validatorWatchedAtAndRate,
  rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = await talkerFunc.readTalker();
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const newRead = [...talkers, newTalker];
    await talkerFunc.writeTalker(newRead);
    return res.status(201).json(newTalker);
  }));
// requisito 5
app.put('/talker/:id',
  validate.validationName,
  validate.validationAge,
  validate.validationTalk,
  validate.validatorWatchedAtAndRate,
  rescue(async (req, res) => {
    const talkers = await talkerFunc.readTalker();
    const indexTalker = talkers.findIndex((talker) => talker.id === req.params.id);
    const { name, age, talk } = req.body;
    const newTalker = { id: Number(req.params.id), name, age, talk };
    talkers.splice(indexTalker, 1, newTalker);
    await talkerFunc.writeTalker(talkers);

    return res.status(200).json(newTalker);
  }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
