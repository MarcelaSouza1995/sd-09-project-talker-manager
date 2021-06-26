const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const routesTalkers = require('./routesTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', routesTalkers);

app.use(middlewares.validatorEmailAndPassword);

app.post('/login', middlewares.login);

app.listen(PORT, () => {
  console.log('Online');
});
