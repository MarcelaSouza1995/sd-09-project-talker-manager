const { validateLogin } = require('../services/loginService');

const mdwLoginVerifier = (req, _res, next) => {
  const verifierObject = validateLogin(req);
  if (verifierObject) return next(verifierObject);
  return next();
};

module.exports = mdwLoginVerifier;