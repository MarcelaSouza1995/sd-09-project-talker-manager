const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) { return res.status(401).json({ message: 'Token não encontrado' }); }

  const tokenRegexCheck = /^[\w]{16}/i;

  if (!tokenRegexCheck.test(authorization)) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateToken;