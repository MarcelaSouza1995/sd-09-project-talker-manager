const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { HTTP_OK_STATUS, PORT } = require('./config');
const {
  getTalkersMiddleware,
  getErrorMiddleware,
  getTalkerByIdMiddleware,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(getTalkersMiddleware));

app.get('/talker/:id', rescue(getTalkerByIdMiddleware));

app.use(getErrorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
