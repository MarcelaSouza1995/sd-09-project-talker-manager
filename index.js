const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01
app.get('/talker', middlewares.getAllTalkers, (req, res) => {
  res.status(200).send(JSON.parse(req.data)); 
});

app.listen(PORT, () => {
  console.log('Online');
});
