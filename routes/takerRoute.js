const express = require('express');
const fs = require('fs/promises');

const router = express.Router();

// 1 - Crie o endpoint GET /talker
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200.

router.get('/', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8').then((response) => JSON.parse(response));

  res.status(200).json(
    data,
  );
});

module.exports = router;
