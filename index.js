const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async (request, response, next) => {
  let talkersList = await fs.readFile('./talker.json', 'utf8');
  talkersList = JSON.parse(talkersList);
  request.talkersList = talkersList;
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Retorna todos os palestrantes. Caso não tenha palestrantes, um array vazio é retornado
app.get('/talker', getTalkers, (request, response) => {
  const { talkersList } = request;
  console.log(talkersList);
  response.status(HTTP_OK_STATUS).json(talkersList);
});

app.listen(PORT, () => {
  console.log('Online');
});
