const fs = require('fs').promises;
const fetchTalkerApi = require('../service/fetchTalkerApi');

const createNewSpeaker = (body, talkers) => {
  const newSpeaker = {
    name: body.name,
    age: body.age,
    id: talkers.length + 1,
    talk: {
      watchedAt: body.talk.watchedAt,
      rate: body.talk.rate,
    },
  };
  return newSpeaker;
};

const addNewTalkerMiddleware = async (req, res, next) => {
  const { body } = req;
  if (body.talk.rate > 5) {
    return next({ code: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  try {
    const talkers = await fetchTalkerApi();
    const speaker = await createNewSpeaker(body, talkers);
    await fs.writeFile('./talker.json', JSON.stringify([...talkers, speaker]));
  } catch (error) {
    return next({ code: 500, message: 'Deu ruim' });
  }
  res.status(201).json('Novo talker adicionado');
};

module.exports = addNewTalkerMiddleware;
