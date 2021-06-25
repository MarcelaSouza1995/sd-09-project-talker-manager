const { verifyLogin } = require('../services/loginService');

const mdwLoginVerifier = (req, _res, next) => {
  const verifierObject = verifyLogin(req);
  if (verifierObject) return next(verifierObject);
  return next();
};

module.exports = mdwLoginVerifier;