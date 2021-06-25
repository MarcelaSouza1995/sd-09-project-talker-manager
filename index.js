const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { 
  getTalkers,
} = require('./middleware');

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

// requisito 1

app.get('/talker', rescue(async (_req, res) => {
  const talkers = await getTalkers();
  res.status(200).json(talkers);
}));

// requisito 2

app.get('/talker/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const selectedTalker = talkers.find((talker) => talker.id === Number(id));
  if (!selectedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  res.status(200).json(selectedTalker);
}));
