const rescue = require('express-rescue');
const fs = require('fs').promises;

const deleteTalker = rescue(async (req, res) => {
  const { id } = req.params;

  const buffTalkers = await fs.readFile('./talker.json');
  const talkers = JSON.parse(buffTalkers.toString('utf-8'));

  const index = talkers.findIndex((talker) => talker.id === Number(id));

  talkers.splice(index, 1);

  await fs.writeFile('./talker.json', JSON.stringify(talkers))
    .then(() => res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }));
});

module.exports = deleteTalker;
