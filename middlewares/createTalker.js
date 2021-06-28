const fs = require('fs').promises;
const rescue = require('express-rescue');

const createTalker = rescue(async (req, res) => {
  const { name, age, talk } = req.body;

  const buffTalkers = await fs.readFile('./talker.json');

  const talkers = JSON.parse(buffTalkers.toString('utf-8'));
  const id = talkers.length + 1;
  talkers.push({ id, name, age, talk });
  await fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then(() => res.status(201).json({ id, name, age, talk }));
});

module.exports = createTalker;
