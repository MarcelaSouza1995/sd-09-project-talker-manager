const writeFiles = require('../utils/writeFiles');
const readFiles = require('../utils/readFiles');

const file = 'talker.json';
const editTalker = async (req, res) => {
  const talkers = await readFiles();
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  const insertTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  newTalkers.push(insertTalker);
  writeFiles(file, newTalkers);
  return res.status(200).json(insertTalker);
};

module.exports = editTalker;