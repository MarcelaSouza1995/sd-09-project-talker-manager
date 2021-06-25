const express = require('express');
const bodyParser = require('body-parser');
const talkerMiddleware = require('./midlewares/talker');
const talkerIdMiddleware = require('./midlewares/talkerId');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerMiddleware, (req, res) => {
  res.status(200).send(JSON.parse(req.data));
});

app.get('/talker/:id', talkerIdMiddleware, (req, res) => {
  if (req.filter) {
    res.status(200).send(req.filter);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
