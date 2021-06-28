const { getTalkers } = require('../services');

const HTTP_OK_STATUS = 200;

async function getTalkersMiddleware(_req, res) {
  const talkers = await getTalkers();
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS);
  return res.status(HTTP_OK_STATUS).json(talkers);
}

module.exports = getTalkersMiddleware;
