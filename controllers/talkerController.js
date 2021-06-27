const { readFile, writeFile } = require('../middlewares');
const { NotFoundError } = require('../errors');
const validations = require('../validations');

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
  async createTalker(req, res, next) {
    const { name, age, talk } = req.body;
    try {
      validations.userData.validateUserName(name);
      validations.userData.validateUserAge(age);
      validations.userData.validateTalkData(talk);

      const prevTalkersData = readFile();
      const lastAutoIncrementId = prevTalkersData
        .reduce((acc, { id }) => (id > acc ? id : acc), 0);

      const talkerData = { name, age, talk, id: lastAutoIncrementId + 1 };
      await writeFile([...prevTalkersData, talkerData]);

      res.status(201).json(talkerData);
    } catch (err) {
      next(err);
    }
  },
};