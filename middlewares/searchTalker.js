const code = require('../httpStatusCodeList');
const readTalkerJson = require('../services/readTalkerJson');

const searchTalker = async (req, res, next) => {
  const { q } = req.query;
  const talkersArray = await readTalkerJson(next);
  const foundTalker = talkersArray.filter((talker) => talker.name.includes(q));

  if (!q) return res.status(code.ok).json(talkersArray);
  if (!foundTalker) return res.status(code.ok).json([]);
  return res.status(code.ok).json(foundTalker);
};

module.exports = searchTalker;
