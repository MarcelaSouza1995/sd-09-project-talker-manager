const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');
const middlewares = require('./middlewares');

const router = express.Router();

const file = './talker.json';

router.get('/', async (_req, res, _next) => {
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  return res.status(200).json(read);
});

router.get('/search', middlewares.validatorToken, rescue(async (req, res, _next) => {
  const searchTerm = req.query.q;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  if (!searchTerm) {
    return res.status(200).json(read);
  }

  const filterTalker = read.filter((talker) => talker.name.includes(searchTerm));

  if (filterTalker) {
    return res.status(200).json(filterTalker);
  }

  return res.status(200).json([]);
}));

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const findTalker = read.find((talker) => talker.id === Number(id));
  
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(read[id - 1]);
});

router.use(middlewares.validatorToken);

router.post('/',
  middlewares.validatorNameAndAge,
  middlewares.validatorTalker,
  middlewares.validatorWatchedAtAndRate,
  rescue(async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const newTalker = {
    id: read.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  const newRead = [...read, newTalker];

  await fs.writeFile(file, JSON.stringify(newRead));

  return res.status(201).json(newTalker);
}));

router.put('/:id',
  middlewares.validatorNameAndAge,
  middlewares.validatorTalker,
  middlewares.validatorWatchedAtAndRate,
  rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const newTalker = {
    id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  read[id - 1] = newTalker;
  await fs.writeFile(file, JSON.stringify(read));

  return res.status(200).json(newTalker);
}));

router.delete('/:id', rescue(async (req, res, _next) => {
  const { id } = req.params;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const newRead = read.filter((talker) => talker.id !== Number(id));

  await fs.writeFile(file, JSON.stringify(newRead));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;
