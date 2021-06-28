const express = require('express');

const router = express.Router();
const HTTP_OK_STATUS = 200;

const {
  readFile,
  addNewTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
} = require('../service');
const { validateToken, validateName, validateAge, validateTalk } = require('../util');

router.get(
  '/search',
  validateToken,
  searchTalker,
);

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const allTalkers = await readFile();
  const talker = allTalkers.find((item) => item.id === +(id));
  if (!talker) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(HTTP_OK_STATUS).json(talker);
});

router.get('/', async (_request, response) => {
  const allTalkers = await readFile();
  if (allTalkers.length === 0) response.status(HTTP_OK_STATUS).json([]);
  response.status(HTTP_OK_STATUS).json(allTalkers);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  addNewTalker,
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  updateTalker,
);

router.delete(
  '/:id',
  validateToken,
  deleteTalker,
);

module.exports = router;
