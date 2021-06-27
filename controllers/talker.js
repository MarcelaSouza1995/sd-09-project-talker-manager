const readFile = require('../services/readFile');

const HTTP_OK_STATUS = 200;

const getAllTalkers = async (req, res) => {
  const talkers = await readFile('talker.json');
  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = {
  getAllTalkers,
};
