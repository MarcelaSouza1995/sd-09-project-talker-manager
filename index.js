const fs = require('fs').promises;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (request, response) => {
  fs.readFile('./talker.json', 'utf-8')
  .then((fileTalker) => JSON.parse(fileTalker))
    .then((res) => response.status(HTTP_OK_STATUS).json(res))
      .catch((error) => response.status(HTTP_OK_STATUS).json([])); 
});

app.listen(PORT, () => {
  console.log('Online');
});