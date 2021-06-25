const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./routes/talker');
const talkersId = require('./routes/talkersId');
const login = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', talkers);

app.use('/', talkersId);

app.use('/', login);

app.use((error, req, res, _next) => {
  console.log('errrrrrrou!!');
  res.status(error.code).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log('Online');
});
