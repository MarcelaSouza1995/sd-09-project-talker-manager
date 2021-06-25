const express = require('express');
const bodyParser = require('body-parser');

const readFile = require('./service/readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const allTalkers = await readFile();
  if (allTalkers.length === 0) response.status(200).json([]);
  response.status(200).json(allTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
