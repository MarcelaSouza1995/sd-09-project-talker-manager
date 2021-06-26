const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const validadeEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const login = require('./login');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateWatchedAt = require('./validateWatchedAt');
const validateRate = require('./validateRate');
const createTalker = require('./createTalker');
// const editTalker = require('./editTalker');
// const deleteTalker = require('./deleteTalker');
// const searchTalker = require('./searchTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  validadeEmail,
  validatePassword,
  login,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker,
 };
