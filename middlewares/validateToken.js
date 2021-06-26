const { errorMessage } = require('../services');

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) res.status(401).json({ message: errorMessage.tokenNotFound });
  if (token.length !== 16) res.status(401).json({ message: errorMessage.invalidToken });
  next();
};

module.exports = validateToken;
