const talkers = require('../talker.json');

const getAllTalkers = (req, res) => {
  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  }
  return res.status(200).json([]);
};

module.exports = getAllTalkers;
