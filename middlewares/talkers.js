const fs = require('fs').promises;

const talkersMiddleware = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs
    .readFile('talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
  if (!id) {
    res.status(200).json(talkers);
  }
  const talkerById = talkers.filter((talker) => talker.id === Number(id));
  if (talkerById.length > 0) {
    res.status(200).json(...talkerById);
  }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkersMiddleware;
