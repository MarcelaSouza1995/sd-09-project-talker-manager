const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  res.status(200).json(talkers);
};

module.exports = { getTalkers };