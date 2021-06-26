const { errorMessage } = require('../services');

const checkToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: errorMessage.tokenNotFound });
  if (token.length !== 16) return res.status(401).json({ message: errorMessage.invalidToken });
  next();
};

module.exports = checkToken;
