const randomToken = require('random-token');
const { tokenList } = require('../data/data');

function getLoginToken() {
  try {
    const tokenCreated = randomToken(16);
    tokenList.push(tokenCreated);
    return tokenCreated;
  } catch (error) {
    error.message = 'Impossivel gerar Token';
    return error;
  }
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
    const emailVerifiedError = verifyEmail(email);
    const passwordVerifiedError = verifyPassword(password);
    if (emailVerifiedError) throw new Error(emailVerifiedError);
    if (passwordVerifiedError) throw new Error(passwordVerifiedError);
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

module.exports = { getLoginToken, validateLogin };
