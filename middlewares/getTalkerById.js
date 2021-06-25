const talkers = require('../talker.json');

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((curr) => curr.id === Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;
