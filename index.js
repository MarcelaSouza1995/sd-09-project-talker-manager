const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async (request, _response, next) => {
  const talkersList = await fs.readFile('./talker.json', 'utf8');
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

app.listen(PORT, () => {
  console.log('Online');
});
