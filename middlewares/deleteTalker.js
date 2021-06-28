const writeFiles = require('../utils/writeFiles');
const readFiles = require('../utils/readFiles');

const file = 'talker.json';
const deleteTalker = async (req, res) => {
  const talkers = await readFiles();
  const { id } = req.params;
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));

  writeFiles(file, newTalkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;