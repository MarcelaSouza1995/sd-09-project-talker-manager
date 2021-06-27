const { readFile, writeFile } = require('../middlewares');
const { NotFoundError } = require('../errors');
const validations = require('../validations');

module.exports = {
  getTalkers(req, res, next) {
    try {
      const talkersData = readFile();
      return res.status(200).json(talkersData);
    } catch (err) {
      return next(err);
    }
  },
  getTalkerById(req, res, next) {
    const { id } = req.params;

    try {
      const talkersData = readFile();
      const talker = talkersData.find(({ id: talkerId }) => talkerId === Number(id));

      if (talker) {
        return res.status(200).json(talker);
      }
        throw new NotFoundError('Pessoa palestrante');
    } catch (err) {
      return next(err);
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
      return next(err);
    }
  },
  async editTalker(req, res, next) {
    const { name, age, talk } = req.body;
    try {
      validations.userData.validateUserName(name);
      validations.userData.validateUserAge(age);
      validations.userData.validateTalkData(talk);

      const { id } = req.params;
      const prevTalkersData = readFile();
      const filteredTalkerArray = prevTalkersData
        .filter(({ id: talkerId }) => Number(id) !== talkerId);

      const talkerData = { name, age, talk, id: Number(id) };
      await writeFile([...filteredTalkerArray, talkerData]);

      return res.status(200).json(talkerData);
    } catch (err) {
      return next(err);
    }
  },
};