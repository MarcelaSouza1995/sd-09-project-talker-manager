const router = require('express').Router();
const readTalkersJson = require('../services/readTalkerJson');
const messageError = require('../services/messagesOfError');
const {
  tokenValidateMiddleware,
  fieldsValidateMiddleware,
  createTalkerMiddleware,
  updateTalkMiddleware } = require('../middlewares');
const code = require('../httpStatusCodeList');

router.get('/', async (_req, res) => {
  const talkers = await readTalkersJson();
  if (!talkers) return res.status(code.ok).json([]);
  return res.status(code.ok).json(talkers);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talker = (await readTalkersJson()).find((persona) => persona.id === Number(id));
  if (!talker) {
    return next({ message: messageError.talkNotFound, status: code.notFound });
  }
  return res.status(code.ok).json(talker);
});

router.post('/', tokenValidateMiddleware, fieldsValidateMiddleware, createTalkerMiddleware);

router.put('/:id', tokenValidateMiddleware, fieldsValidateMiddleware, updateTalkMiddleware);

module.exports = router;