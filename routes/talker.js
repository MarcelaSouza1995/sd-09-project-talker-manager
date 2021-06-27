const express = require('express');
const talkerController = require('../controllers/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', talkerController.getAllTalkers);

module.exports = talkerRouter;
