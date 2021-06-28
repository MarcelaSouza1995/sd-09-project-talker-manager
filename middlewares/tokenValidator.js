const tokenValidator = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ code: 401, message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return next({ code: 401, message: 'Token inválido' });
  }
  return next();
};

module.exports = tokenValidator;