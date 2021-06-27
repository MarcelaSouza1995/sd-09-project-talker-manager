const code = require('../httpStatusCodeList');
const readTalkerJson = require('../services/readTalkerJson');
const writeTalkerJson = require('../services/writeTalkerJson');

const deleteTalkerMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const talkerArray = await readTalkerJson(next);

  const positionElement = talkerArray.indexOf(
    talkerArray.find((talker) => talker.id === Number(id)),
  );

  talkerArray.splice(positionElement, 1);

  await writeTalkerJson(talkerArray, next);

  res.status(code.ok).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalkerMiddleware;