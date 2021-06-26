const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return next(res.status(401).json({ message: 'Token não encontrado' }));
  }

  if (authorization.length < 16) {
    return next(res.status(401).json({ message: 'Token inválido' }));
  }
  return next();
};

module.exports = validateToken;