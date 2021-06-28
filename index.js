const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/requisito01');
const getTalkerById = require('./middlewares/requisito02');
const loginValidate = require('./middlewares/requisito03');
const createTalker = require('./middlewares/requisito04');
const editTalker = require('./middlewares/requisito05');

const {
  validateAuthorization,
  validateName,
  validateAge,
  validateTalkWatchedAt,
  validateTalkRate,
} = require('./utils/validators');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisitos
app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', loginValidate);

app.use(
  validateAuthorization,
  validateName,
  validateAge,
  validateTalkWatchedAt,
  validateTalkRate,
);

app.post('/talker', createTalker);

app.put('/talker/:id', editTalker);

// app.use();

app.listen(PORT, () => {
  console.log('Online');
});
