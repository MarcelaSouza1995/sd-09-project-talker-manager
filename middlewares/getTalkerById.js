const fs = require('fs').promises;
const rescue = require('express-rescue');

const getTalkerById = rescue(async (req, res) => {
  const buffTalkers = await fs.readFile('./talker.json');
  const talkers = JSON.parse(buffTalkers.toString('utf-8'));
  const { id } = req.params;
  const talker = talkers.find((curr) => curr.id === Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = getTalkerById;
