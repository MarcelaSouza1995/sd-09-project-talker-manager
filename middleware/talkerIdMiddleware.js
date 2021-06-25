const fetchTalkerApi = require('../service/fetchTalkerApi');

const talkerIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const talkers = await fetchTalkerApi();
    const talker = talkers.find((element) => element.id === Number(id));
    if (!talker) {
      return next({ code: 404, message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  } catch (error) {
    return next({ code: 404, message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = talkerIdMiddleware;
