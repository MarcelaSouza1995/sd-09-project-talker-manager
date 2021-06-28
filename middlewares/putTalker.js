const fs = require('fs').promises;

const putTalker = async (req, res, _next) => {
  const talkers = await fs.readFile('./talker.json')
  .then((result) => JSON.parse(result));
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerRegistered = {
    id,
    name,
    age,
    talk,
  };
  talkers.splice(id - 1, id - 1, talkerRegistered);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(200).json(talkerRegistered);
};

module.exports = putTalker;