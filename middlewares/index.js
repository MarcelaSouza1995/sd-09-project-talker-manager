const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const loginValidator = require('./loginValidator');
const tokenGenerator = require('./tokenGenerator');

module.exports = { 
  getAllTalkers,
  getTalkerById,
  loginValidator,
  tokenGenerator,
};
