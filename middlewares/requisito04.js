const readFileTalkers = require('../utils/readFile');
const writeFileTalkers = require('../utils/writeFile');

const file = 'talker.json';

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readFileTalkers(file);

  const newTalker = {
    name,
    age,
    id: data.length + 1,
    talk: { watchedAt: talk.watchedAt, rate: talk.rate },
  };

  data.push(newTalker);

  writeFileTalkers(file, [newTalker]);

  return res.status(201).json(newTalker);
};

module.exports = createTalker;
