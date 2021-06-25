const express = require('express');

const readFileMiddleware = require('../middlewares/readFileMiddleware');

const findTalker = require('../middlewares/findTalker');

const talkerRouter = express.Router();

talkerRouter.get('/', readFileMiddleware);

talkerRouter.get('/:id', findTalker);

module.exports = talkerRouter;