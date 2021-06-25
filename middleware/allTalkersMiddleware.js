const fs = require('fs/promises');

const allTalkersMiddleware = async (req, res, next) => {
  try {
    const talkers = await fs.readFile('./talker.json');
    if (talkers === []) {
      return res.status(200).json(talkers);
    }
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return next({ code: 404, message: 'Erro na requisição' });
  }
};

module.exports = allTalkersMiddleware;
