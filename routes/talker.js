const express = require('express');
const talkerController = require('../controllers/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', talkerController.getAllTalkers);

talkerRouter.get('/:id', talkerController.getTalkerById);

module.exports = talkerRouter;
