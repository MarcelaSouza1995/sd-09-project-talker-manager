const router = require('express').Router();
const getTalkers = require('../services/getDataTalker');
const httpStatusCode = require('../httpStatusCodeList');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers) return res.status(httpStatusCode.ok).json([]);
  return res.status(httpStatusCode.ok).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = (await getTalkers()).find((persona) => persona.id === Number(id));
  if (!talker) {
    return res.status(httpStatusCode.notFound).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(httpStatusCode.ok).json(talker);
});

module.exports = router;