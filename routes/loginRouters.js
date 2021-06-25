const router = require('express').Router();
const code = require('../httpStatusCodeList');
const generateToken = require('../services/generateTolken');

// Solução regex encontarda no Stackoverflow em
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  // /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i+\.([a-z]+)?$ - funciona com .com.br (exemplo)
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i; // funciona apenas com um . após email (.com)
  return regex.test(String(email).toLowerCase());
};

const messageError = {
  emailInvalid: { message: 'O "email" deve ter o formato "email@email.com' },
  emailRequerid: { message: 'O campo "email" é obrigatório' },
  passwordInvalid: { message: 'O "password" deve ter pelo menos 6 caracteres' },
  passwordRequerid: { message: 'O campo "password" é obrigatório' },
};

router.get('/', (req, res) => {
  const { email, password } = req.body;

  const token = generateToken();

  if (!email) return res.status(code.badRequest).json(messageError.emailRequerid);

  if (!password) return res.status(code.badRequest).json(messageError.passwordRequerid);

  if (password.length < 6) {
    return res.status(code.badRequest).json(messageError.passwordInvalid);
  }
  if (!validateEmail(email)) {
    return res.status(code.badRequest).json(messageError.emailInvalid);
  }

  return res.status(code.ok).json({ token });
});

module.exports = router;