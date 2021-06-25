const fs = require('fs').promises;

const talkerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await fs.readFile('./talker.json');
    const talkers = JSON.parse(file);
    const idInfo = talkers.find((currFile) => currFile.id === parseInt(id, 10));
    return res.status(200).send(JSON.stringify(idInfo));
  } catch (error) {
    return next({ code: 404, message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = talkerId;