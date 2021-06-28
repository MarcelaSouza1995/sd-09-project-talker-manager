const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const verifyLogin = require('./verifyLogin');
const tokenGenerator = require('./tokenGenerator');
const verifyToken = require('./verifyToken');
const verifyNewTalker = require('./verifyNewTalker');
const createTalker = require('./createTalker');

module.exports = { 
  getAllTalkers,
  getTalkerById,
  verifyLogin,
  tokenGenerator,
  verifyToken,
  createTalker,
  verifyNewTalker,
};
