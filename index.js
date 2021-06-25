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
  .then((fileTalker) => 
    (response.status(HTTP_OK_STATUS)
      .send((fileTalker.trim().length > 0 ? fileTalker : '[]'))));
});

app.listen(PORT, () => {
  console.log('Online');
});
