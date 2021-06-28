const rescue = require('express-rescue');
// const tokenValidator = require('../util');

const verifyToken = rescue(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  // const autantication = await tokenValidator(token);
  // if (!autantication) res.status(401).json({ message: 'Token inválido' });
  next();
});

module.exports = verifyToken;