const { readFile } = require('../middlewares');
const { NotFoundError } = require('../errors');

module.exports = {
  getTalkers(req, res, next) {
    try {
      const talkersData = readFile();
      res.status(200).json(talkersData);
    } catch (err) {
      next(err);
    }
  },
  getTalkerById(req, res, next) {
    const { id } = req.params;

    try {
      const talkersData = readFile();
      const talker = talkersData.find(({ id: talkerId }) => talkerId === Number(id));

      if (talker) {
        res.status(200).json(talker);
      } else {
        throw new NotFoundError('Pessoa palestrante');
      }
    } catch (err) {
      next(err);
    }
  },
};