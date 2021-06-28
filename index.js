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

app.get('/talker', middlewares.getAllTalkers);
app.get('/talker/:id', middlewares.getTalkerById);

app.post('/login', middlewares.generateToken);

app.post(
  '/talker',
  middlewares.validateToken,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validateTalk,
  middlewares.validateDateAndRate,
  middlewares.createTalker,
);

app.put(
  '/talker/:id',
  middlewares.validateToken,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validateTalk,
  middlewares.validateDateAndRate,
  middlewares.updateTalker,
);

app.delete(
  '/talker/:id',
  middlewares.validateToken,
  middlewares.deleteTalker,
);

app.use((err, req, res, _next) => {
  res.status(404).send(err.message);
});

app.listen(PORT, () => {
  console.log('Online');
});
