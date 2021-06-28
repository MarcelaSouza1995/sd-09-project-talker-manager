const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./middlewares/talkers');

const app = express();
app.use(bodyParser.json());

// 1 - Crie o endpoint GET /talker
app.get('/talker', talkers);

// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', talkers);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
