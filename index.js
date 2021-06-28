const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const {
  dataTalker,
  dataTalkerId,
} = require('./src/middlewares/talker');
const {
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate,
} = require('./src/services/validation');
const { getFile } = require('./src/services');
const login = require('./src/middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', dataTalker, (req, res) => {
  res.status(200).send(req.data);
});

app.get('/talker/:id', dataTalkerId, (req, res) => {
  if (!req.talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(req.talkerById);
});

app.post('/login', login);
app.post('/talker',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate,
  async (req, res) => {
    const file = 'talker.json';
    const data = await getFile(file);

    const newTalker = {
      id: data.length + 1,
      ...req.body,
    };

    data.push(newTalker);
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    return res.status(201).json(newTalker);
  });

app.listen(PORT, () => {
  console.log('Online');
});
