const talkers = require('../utils/readFile');

const file = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const data = await talkers(file);
  res.status(200).json(data);
};

module.exports = getAllTalkers;
