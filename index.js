const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', middlewares.getTalkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use((error, _req, res, _next) => {
  res.status(error.code).send({ message: error.message });
});

app.listen(PORT, () => {
  console.log('Online');
});
