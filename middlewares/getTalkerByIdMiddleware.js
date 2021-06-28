const { getTalkerById } = require('../services');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../config');

async function getTalkerByIdMiddleware(req, res) {
  const { id } = req.params;
  const talker = await getTalkerById(Number(id));
  if (!talker) {
    const responseObj = { message: 'Pessoa palestrante não encontrada' };
    return res.status(HTTP_NOT_FOUND_STATUS).json(responseObj); 
  }
  return res.status(HTTP_OK_STATUS).json(talker);
}

module.exports = getTalkerByIdMiddleware;
