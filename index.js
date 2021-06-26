const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const { 
  getTalkers,
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
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

// requisito 7

app.get(
  '/talker/search',
  validateToken,
  rescue(async (req, res) => {
    const searchTerm = req.query.q;
    const talkers = await getTalkers();
    const selectedTalkers = talkers.filter(({ name }) => name.includes(searchTerm));

    res.status(200).send(selectedTalkers);
  }),  
);

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

// requisito 3

app.post('/login', validateEmail, validatePassword, generateToken);

// requisito 4

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  rescue(async (req, res) => {
    const { body } = req;
    const allTalkers = await getTalkers();
    body.id = allTalkers.length + 1;
    allTalkers.push(body);

    await fs.writeFile('talker.json', JSON.stringify(allTalkers));
    res.status(201).json(body);
  }),
);

// requisito 5

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const allTalkers = await getTalkers();

    allTalkers.forEach((talker, index) => {
      if (talker.id === Number(id)) {
        allTalkers[index].name = body.name;
        allTalkers[index].age = body.age;
        allTalkers[index].talk = body.talk;
      }
    });

    await fs.writeFile('talker.json', JSON.stringify(allTalkers));
    res.status(200).json(allTalkers[id - 1]);
  }),
);

// requisito 6

app.delete(
  '/talker/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const allTalkers = await getTalkers();

    const talkesLeft = allTalkers.map((talker) => talker.id !== id);
    await fs.writeFile('talker.json', JSON.stringify(talkesLeft));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }),
);
