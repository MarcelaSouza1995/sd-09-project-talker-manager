const express = require('express');
const bodyParser = require('body-parser');
const getTalker = require('./services/services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  if (talker.length === 0) {
    return response.status(HTTP_OK_STATUS).send([]);
  } 
    response.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (request, response) => {
  const talker = await getTalker();
  const { id } = request.params;
  const filterId = talker.find((element) => element.id === parseInt(id, 10));
  if (!filterId) {
   return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(filterId);
});

app.listen(PORT, () => {
  console.log('Online');
});
