const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getTalkerById, validadeEmail, validatePassword, login, validateToken,
  validateName, validateAge, validateTalk, validateWatchedAt, validateRate, createTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', validadeEmail);
app.post('/login', validatePassword);
app.post('/login', login);

app.post('/talker', validateToken);
app.post('/talker', validateName);
app.post('/talker', validateAge);
app.post('/talker', validateTalk);
app.post('/talker', validateWatchedAt);
app.post('/talker', validateRate);
app.post('/talker', createTalker);
