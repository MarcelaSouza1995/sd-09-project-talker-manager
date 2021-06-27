const validateEmailPassword = (email, password) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email) return 'O campo "email" é obrigatório';
  if (!regexEmail.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';

  return null;
};

module.exports = validateEmailPassword;
