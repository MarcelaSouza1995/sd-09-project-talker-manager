const express = require('express');
const talkerController = require('../controllers/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', talkerController.getAllTalkers);

talkerRouter.get('/:id', talkerController.getTalkerById);

talkerRouter.post(
  '/',
  talkerController.validateToken,
  talkerController.validateName,
  talkerController.validateAge,
  talkerController.validateTalk,
  talkerController.validateWatchedAt,
  talkerController.validateRate,
  talkerController.addTalker,
);

module.exports = talkerRouter;
