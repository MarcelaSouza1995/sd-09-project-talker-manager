const login = require('./login');
const validatorEmailAndPassword = require('./validatorEmailAndPassword');
const validatorNameAndAge = require('./validatorNameAndAge');
const validatorWatchedAtAndRate = require('./validatorWatchedAtAndRate');
const validatorToken = require('./validatorToken');
const validatorTalker = require('./validatorTalker');

module.exports = {
  login,
  validatorEmailAndPassword,
  validatorNameAndAge,
  validatorWatchedAtAndRate,
  validatorToken,
  validatorTalker,
};
