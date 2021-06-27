const talkers = require('../utils/readFile');

const file = 'talker.json';

const getTalkerById = async (req, res) => {
  const { id } = req.params;

  const data = await talkers(file);
  const findTalker = data.find((talker) => talker.id === parseInt(id, 10));

  if (!findTalker) {
    return res
      .status(404)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).send(findTalker);
};

module.exports = getTalkerById;
