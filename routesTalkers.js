const express = require('express');
const fs = require('fs').promises;
const middlewares = require('./middlewares');

const router = express.Router();

const file = './talker.json';

router.get('/', async (_req, res, _next) => {
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  return res.status(200).json(read);
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const findTalker = read.find((talker) => talker.id === Number(id));
  
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(read[id - 1]);
});

router.use(middlewares.validatorToken);

router.use(middlewares.validatorNameAndAge);

router.use(middlewares.validatorTalker);

router.use(middlewares.validatorWatchedAtAndRate);

router.post('/', async (req, res, _next) => {
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

  read.push(newTalker);

  await fs.writeFile(file, JSON.stringify(read));

  return res.status(201).json(newTalker);
});

const editTalker = async (newTalker, read, id, res) => {
  read.map((talker) => (talker.id === id ? newTalker : talker));

  await fs.writeFile(file, JSON.stringify(read));

  return res.status(200).json(newTalker);
};

router.put('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const read = await fs.readFile(file, 'utf8').then((result) => JSON.parse(result));

  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  editTalker(newTalker, read, id, res);
});

module.exports = router;
