const fs = require('fs');

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const idTalker = parseInt(id, 10);

  const talkersData = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const findTalker = talkersData.find((talker) => talker.id === idTalker);

  if (!findTalker) {
    return res
      .status(404)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).send(findTalker);
};

module.exports = getTalkerById;
