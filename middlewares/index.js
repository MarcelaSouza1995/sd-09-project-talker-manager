const getTalkers = require('./getTalkers');
const talkerId = require('./talkerId');
const postLogin = require('./postLogin');
const tokenValidator = require('./tokenValidator');
const talkerValidator = require('./talkerValidator');
const postTalker = require('./postTalker');

module.exports = {
  getTalkers,
  talkerId,
  postLogin,
  postTalker,
  tokenValidator,
  talkerValidator,
};