const fs = require('fs').promises;
const rescue = require('express-rescue');

const file = 'talker.json';
  
const getTalkerById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await fs.readFile(file, 'utf8'); 
  const talkerId = await JSON.parse(response)
    .find((talker) => (talker.id === Number(id) ? talker : (
      next(res.status(404).send({ message: 'Pessoa palestrante não encontrada' }))
    )));
    return res.status(200).json(talkerId);
});

module.exports = getTalkerById;
