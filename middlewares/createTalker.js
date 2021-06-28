const fs = require('fs');
// const writeFiles = require('../utils/writeFiles');
const readFiles = require('../utils/readFiles');

const file = 'talker.json';

const createTalker = (req, res) => {
  const talkers = readFiles();
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

  fs.writeFileSync(file, JSON.stringify(talkers));
  return res.status(201).json(insertTalker);
};

module.exports = createTalker;