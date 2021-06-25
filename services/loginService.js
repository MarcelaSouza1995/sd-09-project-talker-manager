const randomToken = require('random-token');

function getLoginToken() {
  return randomToken(16);
}

function verifyLogin(req) {
  try {
    const { email, password } = req.body;
    const validRegexEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const validRegexPassword = /[\S]{6,}/;
    if (!validRegexEmail.test(email)) throw new Error('O campo "email" é obrigatório');
    if (!validRegexPassword.test(password)) {
      throw new Error('O "email" deve ter o formato "email@email.com"');
    }
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

module.exports = { getLoginToken, verifyLogin };
