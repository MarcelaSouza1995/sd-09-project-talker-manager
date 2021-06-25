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

app.get('/talker', (_req, res) => {
  const talkerList = getTalkerList();
  return res.status(200).send(talkerList);
});

app.get('/talker/:id', async (req, res) => {
  const talkerId = req.params.id;
  const talker = await getTalkerById(talkerId);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
