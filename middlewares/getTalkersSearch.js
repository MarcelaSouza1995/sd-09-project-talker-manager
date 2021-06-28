const fs = require('fs').promises;

const getTalkersSearch = async (req, res, _next) => {
  const talkers = await fs.readFile('./talker.json')
  .then((result) => JSON.parse(result));
  const { searchTerm } = req.query.q;
  if (!searchTerm) return res.status(200).json(talkers);
  const foundTalkers = talkers.filter((talker) => talker.name.includes(searchTerm));
  if (!foundTalkers) return res.status(200).json([]);
  return res.status(200).json(foundTalkers);
};

module.exports = getTalkersSearch;