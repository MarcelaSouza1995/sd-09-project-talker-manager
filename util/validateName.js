const HTTP_BAD_REQUEST_STATUS = 400;

function validateName(request, response, next) {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}

module.exports = validateName;
