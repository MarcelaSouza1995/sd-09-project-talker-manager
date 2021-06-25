const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getTalkerById } = require('./services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res, next) => {
  const data = await getAllTalkers();
  if (data.code) {
    return next(data);
  }
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res, next) => {
  console.log('lendo id de palestrantes');
  const talkerId = req.params.id;
  const talker = await getTalkerById(talkerId);
  if (talker.code) return next(talker);
  return res.status(200).json(talker);
});

app.use((err, req, res, _next) => (
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
));

app.listen(PORT, () => {
  console.log('Online');
});
