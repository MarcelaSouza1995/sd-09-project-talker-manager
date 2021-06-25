const fetchTalkerApi = require('../service/fetchTalkerApi');

const allTalkersMiddleware = async (req, res, next) => {
  try {
    const talkers = await fetchTalkerApi();
    if (talkers === []) {
      return res.status(200).json(JSON.parse(talkers));
    }
    return res.status(200).json(talkers);
  } catch (error) {
    return next(error);
  }
};

module.exports = allTalkersMiddleware;
