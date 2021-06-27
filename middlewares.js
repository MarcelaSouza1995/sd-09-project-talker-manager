const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  res.status(200).send(talkers);
};

const getTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));
  const talker = talkers.find((tal) => tal.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

module.exports = { getTalkers, getTalker };