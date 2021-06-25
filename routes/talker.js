const express = require('express');
const allTalkersMiddleware = require('../middleware/allTalkersMiddleware');
const talkWatchedAtValidateMiddleware = require('../middleware/dateAndRateValidadeMiddleware');
const speakerValidationMiddleware = require('../middleware/speakerValidationMiddleware');
const talkRateValidateMiddleware = require('../middleware/talkRateValidateMiddleware');
const tokenValidation = require('../middleware/tokenValidationMiddleware');
const addNewTalkerMiddleware = require('../middleware/addNewTalkerMiddleware');

const app = express();

app.get('/talker', allTalkersMiddleware);

app.post(
  '/talker',
  tokenValidation,
  speakerValidationMiddleware,
  talkWatchedAtValidateMiddleware,
  talkRateValidateMiddleware,
  addNewTalkerMiddleware,
);

module.exports = app;