const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (req, res) => {
  res.status(200).send(data);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
  // console.log(data);
});
