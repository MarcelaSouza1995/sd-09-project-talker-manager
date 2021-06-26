const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 01
app.get('/talker', (req, res) => {
  const talkersData = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  res.status(HTTP_OK_STATUS).json(talkersData);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
