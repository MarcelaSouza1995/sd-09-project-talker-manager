const express = require('express');
const talkerIdMiddleware = require('../middleware/talkerIdMiddleware');

const app = express();

app.get('/talker/:id', talkerIdMiddleware);

module.exports = app;