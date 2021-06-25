const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllPersons,
  getTalkerById,
  error,
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

app.use('/talker/:id', error);

app.listen(PORT, () => {
  console.log('Online');
});
