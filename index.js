const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./modules');

const { getTalkerList, getTalkerById } = talkers;

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

app.get('/talker', (_req, res) => {
  res.status(200).send(getTalkerList());
});

app.get('/talker/:id', (req, res) => {
  const talkerId = req.params.id;
  res.status(200).send(getTalkerById(talkerId));
});
