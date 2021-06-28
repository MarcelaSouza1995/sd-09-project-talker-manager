const { verifyAuthToken } = require('../services/talkerService');

const mdwTalkerTokenVerifier = (req, _res, next) => {
  const verify = verifyAuthToken(req);
  if (verify) { return next(verify); }
  return next();
};

module.exports = mdwTalkerTokenVerifier;