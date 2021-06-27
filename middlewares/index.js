const tokenValidateMiddleware = require('./tokenValidateMiddleware');
const fieldsValidateMiddleware = require('./fieldsValidateMiddleware');
const errorMiddleware = require('./errorMiddleware');
const createTalkerMiddleware = require('./createTalkerMiddleware');
const updateTalkMiddleware = require('./updateTalkMiddleware');

module.exports = {
  tokenValidateMiddleware,
  fieldsValidateMiddleware,
  errorMiddleware,
  createTalkerMiddleware,
  updateTalkMiddleware,
};