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

app.get('/talker', middlewares.talkers);

app.get('/talker/:id', middlewares.talkerID);

app.post('/login', middlewares.login);

app.use(middlewares.validatorToken);

app.use(middlewares.validatorTalker);

app.post('/talker', middlewares.talkerPOST);

app.put('/talker/:id', middlewares.talkerPUT);

app.listen(PORT, () => {
  console.log('Online');
});
