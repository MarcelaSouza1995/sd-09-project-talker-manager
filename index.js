const express = require('express');
const bodyParser = require('body-parser');
const { talkerRequest, idSearch, authentication } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerRequest, (_request, response) => response.status(200).send());

app.get('/talker/:id', idSearch, (_request, response) => response.status(200).send());

app.post('/login', authentication);

app.listen(PORT, () => {
  console.log('Online');
});
