const fs = require('fs').promises;
const rescue = require('express-rescue');

const updateTalker = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const newTalker = { id, name, age, talk };

  const buffTalkers = await fs.readFile('./talker.json');
  const talkers = JSON.parse(buffTalkers.toString('utf-8'));

  const index = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(index, 1, newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then(() => res.status(200).json(newTalker));
});

module.exports = updateTalker;
