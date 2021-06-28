const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const OK = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const PORT = '3000';
const NO_TALKER = 'Pessoa palestrante não encontrada';
const NO_EMAIL = 'O campo "email" é obrigatório';
const NOT_AN_EMAIL = 'O "email" deve ter o formato "email@email.com"';
const NO_PASSWORD = 'O campo "password" é obrigatório';
const PASSWORD_LENGTH = 'O "password" deve ter pelo menos 6 caracteres';
const EMAIL_REGEX = /^[a-z0-9_-]*@(?:[a-z0-9](?:[a-z0-9-]*)?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const getTalkers = async (request, _response, next) => {
  let talkersList = await fs.readFile('./talker.json', 'utf8');
  talkersList = JSON.parse(talkersList);
  request.talkersList = talkersList;
  next();
};

app.use(getTalkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(OK).send();
});

// Retorna todos os palestrantes. Caso não tenha palestrantes, um array vazio é retornado
app.get('/talker', (request, response) => {
  const { talkersList } = request;
  response.status(OK).json(talkersList);
});

app.get('/talker/:id', getTalkers, (request, response) => {
  const { talkersList, params: { id } } = request;
  const talker = talkersList.find((t) => t.id === +id);
  if (!talker) return response.status(NOT_FOUND).json({ message: NO_TALKER });
  return response.status(OK).json(talker);
});

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email) return response.status(BAD_REQUEST).json({ message: NO_EMAIL });
  if (!password) return response.status(BAD_REQUEST).json({ message: NO_PASSWORD });
  if (!EMAIL_REGEX.test(email)) return response.status(BAD_REQUEST).json({ message: NOT_AN_EMAIL });
  if (password.length < 6) return response.status(BAD_REQUEST).json({ message: PASSWORD_LENGTH });
  return response.status(OK).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log('Online');
});
