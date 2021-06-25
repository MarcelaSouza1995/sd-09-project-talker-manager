const express = require('express');
const bodyParser = require('body-parser');

const { getData } = require('./talkerFunctions.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  try {
    const allTalkers = await getData();
    res.status(HTTP_OK_STATUS).json(allTalkers);
  } catch (error) {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
