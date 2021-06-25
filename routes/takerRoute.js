const express = require('express');
const fs = require('fs/promises');

const router = express.Router();

// 1 - Crie o endpoint GET /talker
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200.

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));

  res.status(200).json(
    talkers,
  );
});

// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404.
router.route('/:id')
  .all(async (req, res, next) => {
    const myId = Number(req.params.id);

    const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));

  const myTalker = talkers.find(({ id }) => id === myId);

  if (!myTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  req.myTalker = myTalker;

  next();
  })
  // 2 - Crie o endpoint GET /talker/:id
  // O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1.
  .get((req, res) => {
    res.status(200).json(
      req.myTalker,
    );
  });

module.exports = router;
