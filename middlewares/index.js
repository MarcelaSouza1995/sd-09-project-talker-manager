const middlewareAllTalkers = require('./middlewareTalker');
const middlewareTalkerId = require('./middlewareTalkerId');
const middlewareLogin = require('./middlawareLogin');
const middlewareAuthentication = require('./middlewareAuthetication');
const { 
  validaNome, 
  validaIdade, 
  validaTalker, 
  validaCamposTalker, 
  addTalker,
  } = require('./middlewareInsertTalker');

module.exports = {
  middlewareAllTalkers,
  middlewareTalkerId,
  middlewareLogin,
  middlewareAuthentication,
  validaNome,
  validaIdade,
  validaTalker,
  validaCamposTalker,
  addTalker,
};