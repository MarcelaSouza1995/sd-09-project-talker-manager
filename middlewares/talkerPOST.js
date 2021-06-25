const fs = require('fs').promises;
const rescue = require('express-rescue');

const talkerPOST = rescue(async (req, res, _next) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const read = await fs.readFile('./talker.json', 'utf8').then((result) => JSON.parse(result));

  const newTalker = {
    id: read.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  read.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(read));

  return res.status(201).json(newTalker);
});

module.exports = talkerPOST;
