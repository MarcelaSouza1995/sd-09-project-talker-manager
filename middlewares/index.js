const tokenValidateMiddleware = require('./tokenValidateMiddleware');
const fieldsValidateMiddleware = require('./fieldsValidateMiddleware');
const errorMiddleware = require('./errorMiddleware');
const createTalkerMiddleware = require('./createTalkerMiddleware');

module.exports = {
  tokenValidateMiddleware,
  fieldsValidateMiddleware,
  errorMiddleware,
  createTalkerMiddleware,
};