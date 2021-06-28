const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

async function getTalkersMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile('./talker.json', 'utf8')
      .then((data) => resolve(res.status(200).json(JSON.parse(data))))
      .catch(() => reject(res.status(200).json([])));
    });
}

app.get('/talker', getTalkersMiddleware);
