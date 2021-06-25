const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { loginValidation } = require('./middlewares');

const app = express();
const dataTalker = './talker.json';
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TOKEN = { token: '7mqaVRXJSp886CGr' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(dataTalker)
    .then((data) => {
      const dataJson = JSON.parse(data);

      if (dataJson.length === 0) return res.status(200).json([]);
      return res.status(200).json(dataJson);
    }).catch((err) => res.status(404).json({ message: err }));
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(dataTalker)
  .then((data) => {
    const dataJson = JSON.parse(data);
    const talkerFound = dataJson.find((talker) => talker.id === Number(req.params.id));

    if (talkerFound) return res.status(200).json(talkerFound);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }).catch((err) => res.status(404).json({ message: err }));
});

app.post('/login', loginValidation, (_req, res) => {
  res.status(200).json(TOKEN);
});

app.listen(PORT, () => {
  console.log('Online');
});
