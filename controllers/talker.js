const express = require('express');

const fs = require('fs').promises;

const talkerFile = require('../services/index');

const talkerRouter = express.Router();

const readFileMiddleware = require('../middlewares/readFileMiddleware');

const findTalker = require('../middlewares/findTalker');

const verifyToken = require('../middlewares/verifyToken');

const verifyTalkerName = require('../middlewares/verifyTalkerName');

const verifyTalkerAge = require('../middlewares/verifyTalkerAge');

const verifyTalk = require('../middlewares/verifyTalk');

const verifyWatchedAt = require('../middlewares/verifyWatchedAt');

const verifyRate = require('../middlewares/verifyRate');

talkerRouter.get('/', readFileMiddleware);

talkerRouter.get('/:id', findTalker);

talkerRouter.post(
  '/',
  verifyToken, 
  verifyTalkerName, 
  verifyTalkerAge, 
  verifyTalk,
  verifyWatchedAt, 
  verifyRate,
  async (req, res) => {
    const data = await talkerFile();
    const newTalker = {
       id: data.length + 1,
       ...req.body,
    };
    data.push(newTalker);

    await fs.writeFile('./talker.json', JSON.stringify(data, null, 2));

    return res.status(201).json({ ...newTalker });
  },
);

talkerRouter.put(
  '/:id',
  verifyToken,
  verifyTalkerName,
  verifyTalkerAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
  async (req, res) => {
    const data = await talkerFile();
    const { id } = req.params;
    const filteredTalker = data.filter((talker) => talker.id !== +(id));

    const editedTalker = {
      id: Number(id),
       ...req.body,
    };
    filteredTalker.push(editedTalker);
    console.log(filteredTalker);

    await fs.writeFile('./talker.json', JSON.stringify(filteredTalker, null, 2));

    return res.status(200).json(editedTalker);
  },
);

talkerRouter.delete(
  '/:id',
  verifyToken,
async (req, res) => {
  const data = await talkerFile();
  const { id } = req.params;
  const filteredTalkers = data.filter((talker) => talker.id !== +(id));

  await fs.writeFile('./talker.json', JSON.stringify(filteredTalkers, null, 2));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
},
);

module.exports = talkerRouter;
