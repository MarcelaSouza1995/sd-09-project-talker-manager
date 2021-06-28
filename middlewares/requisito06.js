const readFileTalkers = require('../utils/readFile');
const writeFileTalkers = require('../utils/writeFile');

const file = 'talker.json';

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const data = await readFileTalkers(file);

  const filterTalkers = data.filter((talker) => talker.id !== Number(id));

  writeFileTalkers(file, [filterTalkers]);

  return res
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
