const talkers = require('../talker.json');

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((curr) => curr.id === Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  throw new Error('Pessoa palestrante não encontrada');
};

module.exports = getTalkerById;
