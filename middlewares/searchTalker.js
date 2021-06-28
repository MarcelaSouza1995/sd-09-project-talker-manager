const readFiles = require('../utils/readFiles');

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkers = await readFiles();

  const result = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(result);
};

module.exports = searchTalker;