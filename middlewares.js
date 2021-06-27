const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  let talkers = await fs.readFile('./talker.json', 'utf-8');
  //talkers = talkers.substring(1);
  //const last = talkers.length - 2;
  //talkers = talkers.substring(1, last);
  JSON.parse(talkers);
  res.status(200).send(talkers);
};

module.exports = { getTalkers };