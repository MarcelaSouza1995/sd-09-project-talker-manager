const fs = require('fs/promises');
const rescue = require('express-rescue');

const getAllTalkers = rescue(async (req, res) => {
  const talkers = await fs.readFile('./talker.json');
  if (talkers.toString('utf-8') === []) {
    return res.status(200).send(JSON.parse([]));
  }
  return res.status(200).json(JSON.parse(talkers.toString('utf-8')));
});

module.exports = getAllTalkers;
