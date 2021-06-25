const crypto = require('crypto');

const testEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return ({ code: 400, message: 'O campo "email" é obrigatório' });
  } if (!regexEmail.test(email)) {
    return ({ code: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  return '';
};
const testPassword = (password) => {
  if (!password || password === '') {
    return ({ code: 400, message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return ({ code: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
  return '';
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailStatus = testEmail(email);
  const passwordStatus = testPassword(password);
  if (emailStatus) {
    return next(emailStatus);
  }
  if (passwordStatus) {
    return next(passwordStatus);
  }  
  const tokenObj = { token: crypto.randomBytes(16).toString('hex') };
  return res.status(200).send(JSON.stringify(tokenObj));
};

module.exports = postLogin;