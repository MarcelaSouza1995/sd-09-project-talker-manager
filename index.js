const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';
const NOT_FOUND_MESSAGE = 'Pessoa palestrante não encontrada';

const getTalkers = async (request, _response, next) => {
  let talkersList = await fs.readFile('./talker.json', 'utf8');
  talkersList = JSON.parse(talkersList);
  request.talkersList = talkersList;
  next();
};

app.use(getTalkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Retorna todos os palestrantes. Caso não tenha palestrantes, um array vazio é retornado
app.get('/talker', (request, response) => {
  const { talkersList } = request;
  response.status(HTTP_OK_STATUS).json(talkersList);
});

app.get('/talker/:id', getTalkers, (request, response) => {
  const { talkersList, params: { id } } = request;
  const talker = talkersList.find((t) => t.id === +id);
  if (!talker) return response.status(HTTP_NOT_FOUND_STATUS).json({ message: NOT_FOUND_MESSAGE });
  return response.status(HTTP_OK_STATUS).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
