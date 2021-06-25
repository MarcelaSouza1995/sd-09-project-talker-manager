const fs = require('fs').promises;
const rescue = require('express-rescue');

const talkerID = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const read = await fs.readFile('./talker.json', 'utf8').then((result) => JSON.parse(result));

  const findTalker = read.find((talker) => talker.id === Number(id));
  
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(read[id - 1]);
});

module.exports = talkerID;
