const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const { validateTalkerName,
  validateTalkerAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
  validateToken } = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.getAllTalkers);

app.get('/talker/:id', middlewares.getTalkerById);

app.post('/login', middlewares.login);

app.post('/talker', 
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  middlewares.createTalker);

app.post('/talker/:id', 
validateToken,
validateTalkerName,
validateTalkerAge,
validateTalk,
validateWatchedAt,
validateRate);

app.use((err, _req, res, _next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log('Online');
});
