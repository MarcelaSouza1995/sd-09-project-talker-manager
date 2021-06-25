const fs = require('fs').promises;

const postTalker = async (req, res, _next) => {
  const talkers = await fs.readFile('./talker.json')
  .then((result) => JSON.parse(result));
  const { name, age, talk } = req.body;
  const talkerRegistered = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(talkerRegistered);
  await fs.writeFile('./talker.json', talkers);
  return res.status(201).json(talkerRegistered);
};

module.exports = postTalker;