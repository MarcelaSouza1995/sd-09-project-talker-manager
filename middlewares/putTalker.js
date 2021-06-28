const fs = require('fs').promises;

const putTalker = async (req, res, _next) => {
  const talkers = await fs.readFile('./talker.json')
  .then((result) => JSON.parse(result));
  const { id } = req.params;
  const idInt = parseInt(id, 10);
  const { name, age, talk } = req.body;
  const talkerRegistered = {
    id: idInt,
    name,
    age,
    talk,
  };
  talkers.splice(idInt - 1, idInt - 1, talkerRegistered);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(200).json(talkerRegistered);
};

module.exports = putTalker;