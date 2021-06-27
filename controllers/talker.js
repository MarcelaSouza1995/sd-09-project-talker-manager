const express = require('express');

const fs = require('fs').promises;

const talkerFile = require('../services/index');

const talkerRouter = express.Router();

const readFileMiddleware = require('../middlewares/readFileMiddleware');

const findTalker = require('../middlewares/findTalker');

// const registerTalker = require('../middlewares/registerTalker');

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

module.exports = talkerRouter;