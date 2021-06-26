const express = require('express');
const { getAllTalkers, getTalkerById, checkToken, checkName, checkAge, checkTalk,
  checkWatchedAt, checkRate, createTalker } = require('../middlewares');

const app = express.Router();

app.get('/', getAllTalkers);
app.get('/:id', getTalkerById);
app.post('/', checkToken, checkName, checkAge, checkTalk, checkWatchedAt, checkRate, createTalker);

module.exports = app;
