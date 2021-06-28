const createTalker = require('./createTalker');
const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const generateToken = require('./generateToken');
const validateAge = require('./validateAge');
const validateDateAndRate = require('./validateDateAndRate');
const validateName = require('./validateName');
const validateTalk = require('./validateTalk');
const validateToken = require('./validateToken');
const updateTalker = require('./updateTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  createTalker,
  deleteTalker,
  getAllTalkers,
  getTalkerById,
  generateToken,
  updateTalker,
  validateAge,
  validateDateAndRate,
  validateName,
  validateTalk,
  validateToken,
};
