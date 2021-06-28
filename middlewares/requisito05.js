const readFileTalkers = require('../utils/readFile');
const writeFileTalkers = require('../utils/writeFile');

const file = 'talker.json';

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const data = await readFileTalkers(file);

  let findTalker = data.find((talker) => talker.id === id);

  findTalker = {
    ...findTalker,
    name,
    age,
    talk: { watchedAt: talk.watchedAt, rate: talk.rate },
  };

  writeFileTalkers(file, [{ id: Number(id), ...findTalker }]);

  return res.status(200).json({ id: Number(id), ...findTalker });
};

module.exports = editTalker;
