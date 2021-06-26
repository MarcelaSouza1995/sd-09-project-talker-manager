const express = require('express');
const { getAllTalkers, getTalkerById, checkToken, checkName, checkAge, checkTalk,
  checkWatchedAt, checkRate, createTalker, editTalker } = require('../middlewares');

const route = express.Router();

route.get('/', getAllTalkers);
route.get('/:id', getTalkerById);
route.use(checkToken);
route.post('/', checkName, checkAge, checkTalk, checkWatchedAt, checkRate, createTalker);
route.put('/:id', checkName, checkAge, checkTalk, checkWatchedAt, checkRate, editTalker);

module.exports = route;
