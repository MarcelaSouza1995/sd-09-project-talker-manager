const { getLoginToken } = require('../services/loginService');

const mdwLoginToken = (_req, res, _next) => {
  const token = getLoginToken();
  return res.status(200).json({ token });
};

module.exports = mdwLoginToken;