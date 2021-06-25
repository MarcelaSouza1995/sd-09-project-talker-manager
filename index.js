const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllPersons,
  getTalkerById,
  error,
  login,
} = require('./mids');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllPersons);
app.get('/talker/:id', getTalkerById);

app.post('/login', login);

app.use(error);

app.listen(PORT, () => {
  console.log('Online');
});
