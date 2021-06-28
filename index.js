const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = 'talker.json';
app.get('/talker', (_request, response) => {
  const data = fs.readFileSync(talker, 'utf8');
  if (data.length > 0) {
    return response.status(200).json(JSON.parse(data));
  }
  return response.status(200).json([]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
