const writeFiles = require('../utils/writeFiles');
const readFiles = require('../utils/readFiles');

const file = 'talker.json';
const editTalker = async (req, res) => {
  const talkers = await readFiles();
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  
  const insertTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  filteredTalkers.push(insertTalker);
  writeFiles(file, filteredTalkers);
  return res.status(200).json(insertTalker);
};

module.exports = editTalker;