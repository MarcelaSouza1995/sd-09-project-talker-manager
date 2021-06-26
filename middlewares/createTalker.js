const writeFiles = require('../utils/writeFiles');
const readFiles = require('../utils/readFiles');

const file = 'talker.json';

const createTalker = async (req, res) => {
  const talkers = await readFiles();
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;

  const insertTalker = {
    id: talkers.length + 1,
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    talkers.push(insertTalker);

  writeFiles(file, insertTalker);
  return res.status(201).json(talkers);
};

module.exports = createTalker;