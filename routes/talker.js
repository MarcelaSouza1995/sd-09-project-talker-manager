const express = require('express');
const allTalkersMiddleware = require('../middleware/allTalkersMiddleware');

const app = express();

app.get('/talker', allTalkersMiddleware);

module.exports = app;