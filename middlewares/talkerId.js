const fs = require('fs').promises;

const talkerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await fs.readFile('./talker.json');
    const talkers = await JSON.parse(file);
    const idInfo = talkers.find((currFile) => currFile.id === parseInt(id, 10));
    if (idInfo) return res.status(200).json(idInfo);
    return next({ code: 404, message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = talkerId;