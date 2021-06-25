function validateEmail(request, response, next) {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) {
    return response.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

module.exports = validateEmail;
