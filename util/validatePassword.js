const HTTP_BAD_REQUEST_STATUS = 400;

function validatePassword(request, response, next) {
  const { password } = request.body;
  if (!password) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = validatePassword;
