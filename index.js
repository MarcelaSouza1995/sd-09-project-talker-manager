const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.talkerRequest, (req, res) => res.status(200).send());

app.get('/talker/:id', (req, res) => {
  fs.readFile('./talker.json')
  .then((files) => {
  const { id } = req.params;
  const jsonArray = JSON.parse(files);
  const findArray = jsonArray.find((item) => item.id === Number(id));
  if (findArray) {
    return res.status(200).json(findArray);
  }
})
.catch(() => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
});

app.listen(PORT, () => {
  console.log('Online');
});
