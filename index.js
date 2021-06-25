const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async (_request, response, _next) => {
  const talkersList = await fs.readFile('./talker.json', 'utf8');
  response.status(HTTP_OK_STATUS).json({ talkersList: JSON.parse(talkersList) });
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Este endpoint retorna todos os palestrantes. Caso não tenha palestrantes, um array vazio é retornado
app.get('/talker', getTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
