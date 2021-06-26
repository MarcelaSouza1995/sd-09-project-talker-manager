const express = require('express');
const bodyParser = require('body-parser');
const { dataTalker } = require('./src/middlewares/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', dataTalker, (req, res) => {
  // console.log(Object.keys(req));
  res.status(200).send(JSON.parse(req.data));
});

app.get('/talker/:id', dataTalker, (req, res) => {
  res.status(200).send(JSON.parse(req.data));
});

app.listen(PORT, () => {
  console.log('Online');
});
