const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.talkerRequest, (req, res) => {
  console.log('caiu no banco');
  return res.status(200).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
