const fs = require('fs').promises;
const rescue = require('express-rescue');

const talker = rescue(async (_req, res, _next) => {
  const read = await fs.readFile('./talker.json', 'utf8').then((result) => JSON.parse(result));

  return res.status(200).json(read);
});

module.exports = talker;
