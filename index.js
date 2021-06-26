const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const randonToken = (n) => {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < n; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
};
// adaptado de https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/ 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// req 1:
const routerMiddleware = require('./routerMiddleware');

/* Todas as rotas com /talker/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/talker', routerMiddleware);

const { validation } = require('./validation');
// req 3
app.post('/login',
  validation,
  (_req, res) => {
    try {
      const token = randonToken(16);
      return res.status(HTTP_OK_STATUS).send({ token });
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

// consultei o repositório de meu colega João Castaldi
// https://github.com/tryber/sd-08-project-talker-manager/pull/34/files#diff-256422c877a0031a44f2168c442cddace08df1226b1e4ec5f529a0f869ea5b8aR19
