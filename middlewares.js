const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  // talkers = talkers.substring(1);
  // const last = talkers.length - 2;
  // talkers = talkers.substring(1, last);
  // JSON.parse(talkers);
  console.log(talkers);
  res.status(200).send(talkers);
};

module.exports = { getTalkers };