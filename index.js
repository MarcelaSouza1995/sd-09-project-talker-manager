const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers } = require('./services/talker');

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

//

app.get('/talker', async (_request, response) => {
  try {
    const talkers = await getTalkers();
    if (!talkers.length) response.status(HTTP_OK_STATUS).json([]);
    response.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    console.log(err);
  }
});
