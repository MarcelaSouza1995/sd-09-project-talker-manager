const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');

const {
  getData,
  getTalkerById,
  validateLogin,
  validateNewTalker,
  validateNameAndAge,
  talkIsNotEmpty,
  validateTalk,
  validateToken,
} = require('./talkerFunctions.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

app.get('/talker', async (_req, res, next) => {
  try {
    const allTalkers = await getData();
    res.status(HTTP_OK_STATUS).json(allTalkers);
  } catch (error) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  next();
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await getTalkerById(id);
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    res.status(HTTP_NOT_FOUND).json({ message: error.message });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    validateLogin(email, password);
    const token = crypto.randomBytes(8).toString('hex');
    res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
});

app.post(
  '/talker',
  validateToken,
  validateNameAndAge,
  talkIsNotEmpty,
  validateTalk,
  validateNewTalker,
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
