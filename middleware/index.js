const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkersById');
const { login, validations } = require('./login');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validations,
};