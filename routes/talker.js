const express = require('express');
const allTalkersMiddleware = require('../middleware/allTalkersMiddleware');

const app = express();

app.get('/', allTalkersMiddleware);

module.exports = app;