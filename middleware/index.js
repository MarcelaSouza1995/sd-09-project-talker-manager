const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkersById');
const { login, emailValidation, passwordValidation } = require('./login');
const { createTalker, authMiddleware } = require('./createTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  emailValidation,
  passwordValidation,
  createTalker,
  authMiddleware,
};