const fs = require('fs').promises;

const postTalker = async (req, res, _next) => {
  const talkers = await fs.readFile('./talker.json')
  .then((result) => JSON.parse(result));
  const { id } = req.params;
  talkers.splice(id - 1, id - 1);
  console.log(talkers);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = postTalker;