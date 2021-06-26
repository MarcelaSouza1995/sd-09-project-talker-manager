const fs = require('fs/promises');
const tokenValidation = require('./helpers/tokenValidation');
const {
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
} = require('./helpers/addnewTalkerValidation');

const validations = (name, age, talk = '') => {
  const nameStatus = nameValidation(name);
  const ageStatus = ageValidation(age);
  const talkStatus = talkValidation(talk);
  const watchedAtStatus = watchedAtValidation(talk.watchedAt);
  const rateStatus = rateValidation(talk.rate);

  return [nameStatus, ageStatus, talkStatus, watchedAtStatus, rateStatus];
};

const addNewTalker = async (req, res, _next) => {
  const tokenStatus = tokenValidation(req.headers.authorization);
  const array = validations(req.body.name, req.body.age, req.body.talk);
  const talkers = await fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));
  req.body.id = talkers.length + 1;
  await fs.writeFile('./talker.json', JSON.stringify([...talkers, req.body]));

  if (tokenStatus.status !== 201) {
    return res.status(tokenStatus.status).json({ message: tokenStatus.message });
  }
  console.log(req.body);
  console.log(talkers.length);
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].status !== 200) {
      return res.status(array[i].status).json({ message: array[i].message });
    }
  }
  return res.status(201).json(req.body);
};

module.exports = addNewTalker;
