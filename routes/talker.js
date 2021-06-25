const express = require('express');

const router = express.Router();

const readFile = require('../service/readFile');

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const allTalkers = await readFile();
  const talker = allTalkers.find((item) => item.id === +(id));
  if (!talker) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talker);
});

router.get('/', async (_request, response) => {
  const allTalkers = await readFile();
  if (allTalkers.length === 0) response.status(200).json([]);
  response.status(200).json(allTalkers);
});

module.exports = router;
