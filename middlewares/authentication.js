const Rand = () => Math.random(0).toString(36).substr(2);
const generateToken = (length) => (Rand() + Rand() + Rand() + Rand()).substr(0, length);

function validEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validPassword(password) {
  const passwordRegex = /^\d{6,30}$/;
  return passwordRegex.test(password);
}

const authentication = (request, response) => {
  const token = generateToken(16);
  const { email, password } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validPassword(password)) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(200).json({ token });
};

module.exports = authentication;