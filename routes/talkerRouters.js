const router = require('express').Router();
const getTalkers = require('../services/getDataTalker');
const httpStatusCode = require('../httpStatusCodeList');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers) return res.status(httpStatusCode.ok).json([]);
  return res.status(httpStatusCode.ok).json(talkers);
});

module.exports = router;