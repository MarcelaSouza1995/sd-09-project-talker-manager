const { getLoginToken } = require('../services/loginService');

const mdwLoginToken = (_req, res, next) => {
  const token = getLoginToken();
  if (token.message) return next(token);
  return res.status(200).json({ token });
};

module.exports = mdwLoginToken;