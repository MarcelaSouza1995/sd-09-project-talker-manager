const { validateTalkerObj } = require('../services/talkerService');

const mdwTalkerObjVerifier = (req, res, next) => {
  const verify = validateTalkerObj(req);
  if (verify) { return next(verify); }
  return next();
};

module.exports = mdwTalkerObjVerifier;