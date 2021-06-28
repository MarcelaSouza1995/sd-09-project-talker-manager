const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {
  getAllTalkers,
  getTalkerById,
  saveNewTalker,
  editTalker,
  deleteTalker,
  // getTalkerBySearchTerm,
} = require('./services');
const validate = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search',
validate.validateToken,
async (req, res, _next) => {
  const searchTerm = req.query.q;
  console.log(req.query.q);
  const data = await getAllTalkers();
  if (!searchTerm || searchTerm === '') return res.status(200).json(data);
  const talkers = data.filter((person) => person.name.includes(searchTerm));
  return res.status(200).json(talkers);
});

app.get('/talker', async (_req, res, next) => {
  const data = await getAllTalkers();
  if (data.status) {
    return next(data);
  }
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res, next) => {
  const talkerId = req.params.id;
  const talker = await getTalkerById(talkerId);
  if (talker.status) return next(talker);
  return res.status(200).json(talker);
});

app.post('/login', validate.validateEmailAndPassword, (req, res, _next) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker',
  validate.validateToken,
  validate.validateAge,
  validate.validateName,
  validate.validateTalk,
  validate.validateWatchedAtAndRate,
  async (req, res, next) => {
    const talker = req.body;
    const newTalker = await saveNewTalker(talker);
    if (newTalker.status) return next(newTalker);
    return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validate.validateToken,
  validate.validateAge,
  validate.validateName,
  validate.validateTalk,
  validate.validateWatchedAtAndRate,
  async (req, res, next) => {
    const talkerId = req.params.id;
    const editedTalker = await editTalker(Number(talkerId), req.body);
    if (editedTalker.status) return next(editedTalker);
    return res.status(200).json(editedTalker);
});

app.delete('/talker/:id',
validate.validateToken,
async (req, res, next) => {
  const talkerId = req.params.id;
  const newData = await deleteTalker(Number(talkerId));
  if (newData.status) return next(newData);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use((err, _req, res, _next) => res.status(err.status).json({ message: err.message }));

app.listen(PORT, () => {
  console.log('Online');
});
