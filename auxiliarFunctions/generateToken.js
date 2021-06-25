const crypto = require('crypto');

const generateToken = () => {
  const myToken = crypto.randomBytes(8).toString('hex');

  return myToken;
};

module.exports = generateToken;
