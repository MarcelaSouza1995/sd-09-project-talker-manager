const fs = require('fs');

const getAllTalkers = (_req, res) => {
  const talkersData = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  res.status(200).json(talkersData);
};

module.exports = getAllTalkers;