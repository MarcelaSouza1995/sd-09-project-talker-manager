const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');
const login = require('./login');
const checkToken = require('./checkToken');
const checkName = require('./checkName');
const checkAge = require('./checkAge');
const checkTalk = require('./checkTalk');
const checkWatchedAt = require('./checkWatchedAt');
const checkRate = require('./checkRate');
const createTalker = require('./createTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
// const searchTalker = require('./searchTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  checkEmail,
  checkPassword,
  login,
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  createTalker,
  editTalker,
  deleteTalker,
};
