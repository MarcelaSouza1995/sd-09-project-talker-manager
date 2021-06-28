const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const dataTalker = './talker.json';
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3001';

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
}); //

app.listen(PORT, () => {
  console.log('Online');
});