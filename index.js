const express = require('express');
const bodyParser = require('body-parser');

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

// req 1:
const routerMiddleware = require('./routerMiddleware');

/* Todas as rotas com /simpsons/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/talker', routerMiddleware);
