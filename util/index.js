const { TOKEN, tokenValidator } = require('./tokenValidator');
const emailValidator = require('./emailValidator');
const passwordValidator = require('./passwordValidator');
const newTalkerValidator = require('./newTalkerValidator');

module.exports = { 
  TOKEN,
  emailValidator,
  passwordValidator,
  tokenValidator,
  newTalkerValidator,
};
