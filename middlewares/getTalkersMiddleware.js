const { getTalkers } = require('../services');
const { HTTP_OK_STATUS } = require('../config');

async function getTalkersMiddleware(_req, res) {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
}

module.exports = getTalkersMiddleware;
