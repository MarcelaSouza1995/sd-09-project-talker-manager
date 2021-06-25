const fs = require('fs').promises;
const rescue = require('express-rescue');

const editTalker = rescue(async (newTalker, read, id, res) => {
  read.map((talker) => (talker.id === id ? newTalker : talker));

  await fs.writeFile('./talker.json', JSON.stringify(read));

  return res.status(200).json(newTalker);
});

const talkerPUT = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const read = await fs.readFile('./talker.json', 'utf8').then((result) => JSON.parse(result));

  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  editTalker(newTalker, read, id, res);
});

module.exports = talkerPUT;
