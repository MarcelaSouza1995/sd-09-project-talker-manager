const code = require('../httpStatusCodeList');
const readTalkerJson = require('../services/readTalkerJson');
const writeTalkerJson = require('../services/writeTalkerJson');

const updateTalkMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const talkersArray = await readTalkerJson(next);
  if (!talkersArray) return;

  const newTalkersArray = talkersArray.reduce((acc, crr) => {
    if (crr.id === Number(id)) {
      acc.push({ id: Number(id), ...req.body });
    } else {
      acc.push(crr);
    }
    return acc;
  }, []);

  await writeTalkerJson(newTalkersArray, next);

  return res.status(code.ok).json({ id: Number(id), ...req.body });
};

module.exports = updateTalkMiddleware;
