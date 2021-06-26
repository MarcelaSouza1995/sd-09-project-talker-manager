const getTalkers = require('./getTalkers');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const generateToken = require('./generateToken');
const validateToken = require('./validateTolken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateWatchedAt = require('./validateWatchedAt');
const validateRate = require('./validateRate');
const addTalker = require('./addTalker');

module.exports = {
  getTalkers,
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  addTalker,
};
