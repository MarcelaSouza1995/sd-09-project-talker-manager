const express = require('express');
const { getAllTalkers, getTalkerById, checkToken, checkName, checkAge, checkTalk,
  checkWatchedAt, checkRate, createTalker, editTalker, deleteTalker, searchTalker,
} = require('../middlewares');

const route = express.Router();

route.get('/', getAllTalkers);
route.get('/search', checkToken, searchTalker);
route.get('/:id', getTalkerById);
route.use(checkToken);
route.post('/', checkName, checkAge, checkTalk, checkWatchedAt, checkRate, createTalker);
route.put('/:id', checkName, checkAge, checkTalk, checkWatchedAt, checkRate, editTalker);
route.delete('/:id', deleteTalker);

module.exports = route;
