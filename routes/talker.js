const express = require('express');
const allTalkersMiddleware = require('../middleware/allTalkersMiddleware');
const talkWatchedAtValidateMiddleware = require('../middleware/dateAndRateValidadeMiddleware');
const talkWatchedAtValidateMiddlewarePUT = require(
  '../middleware/talkWatchedAtValidateMiddlewarePUT',
);
const speakerValidationMiddleware = require('../middleware/speakerValidationMiddleware');
const talkRateValidateMiddleware = require('../middleware/talkRateValidateMiddleware');
const tokenValidation = require('../middleware/tokenValidationMiddleware');
const addNewTalkerMiddleware = require('../middleware/addNewTalkerMiddleware');
const editTalker = require('../middleware/editTalkerMiddleware');
const talkRatePutMiddleware = require('../middleware/talkRatePutMiddleware');

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

app.put(
  '/talker/:id',
  tokenValidation,
  speakerValidationMiddleware,
  talkWatchedAtValidateMiddlewarePUT,
  talkRatePutMiddleware,
  talkRateValidateMiddleware,
  editTalker,
);

module.exports = app;