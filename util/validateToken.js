const HTTP_UNAUTHORIZED_STATUS = 401;

function validateToken(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token inválido',
    });
  }
  next();
}

module.exports = validateToken;
