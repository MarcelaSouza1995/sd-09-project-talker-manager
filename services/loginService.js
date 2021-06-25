const randomToken = require('random-token');

function getLoginToken() {
  return randomToken(16);
}

function verifyEmail(email) {
  const error1 = 'O campo "email" é obrigatório';
  const error2 = 'O "email" deve ter o formato "email@email.com';
  const validRegexEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  if (!email) return error1;
  if (!validRegexEmail.test(email)) return error2;
  return false;
}

function verifyPassword(password) {
  const error1 = 'O campo "password" é obrigatório';
  const error2 = 'O "password" deve ter pelo menos 6 caracteres';
  const validRegexPassword = /[\S]{6,}/;
  if (!password) return error1;
  if (!validRegexPassword.test(password)) return error2;
  return false;
}

function validateLogin(req) {
  try {
    const { email, password } = req.body;
    const emailVerifiedMsg = verifyEmail(email);
    const passwordVerifiedMsg = verifyPassword(password);
    if (emailVerifiedMsg) throw new Error(emailVerifiedMsg);
    if (passwordVerifiedMsg) throw new Error(passwordVerifiedMsg);
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

module.exports = { getLoginToken, validateLogin };
