const tokenValidateMiddleware = require('./tokenValidateMiddleware');
const fieldsValidateMiddleware = require('./fieldsValidateMiddleware');
const errorMiddleware = require('./errorMiddleware');
const createTalkerMiddleware = require('./createTalkerMiddleware');
const updateTalkMiddleware = require('./updateTalkMiddleware');
const deleteTalkerMiddleware = require('./deleteTalkerMiddleware');
const searchTalker = require('./searchTalker');

module.exports = {
  tokenValidateMiddleware,
  fieldsValidateMiddleware,
  errorMiddleware,
  createTalkerMiddleware,
  updateTalkMiddleware,
  deleteTalkerMiddleware,
  searchTalker,
};