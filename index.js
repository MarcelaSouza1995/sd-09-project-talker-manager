const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getAllTalkers, getTalkerById, checkEmailAndPassword } = require('./services');

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
  if (data.status) {
    return next(data);
  }
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res, next) => {
  console.log('lendo id de palestrantes');
  const talkerId = req.params.id;
  const talker = await getTalkerById(talkerId);
  if (talker.status) return next(talker);
  return res.status(200).json(talker);
});

app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const checkInfo = checkEmailAndPassword(email, password);
  if (checkInfo.status) return next(checkInfo);
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.use((err, req, res, _next) => res.status(err.status).json({ message: err.message }));

app.listen(PORT, () => {
  console.log('Online');
});
