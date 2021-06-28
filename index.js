const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middlewares/req1');
const getTalkerById = require('./middlewares/req2');
const loginValidate = require('./middlewares/req3');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', loginValidate);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});