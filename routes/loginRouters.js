const router = require('express').Router();
const code = require('../httpStatusCodeList');
const generateToken = require('../services/generateTolken');
const messageError = require('../services/messagesOfError');

// Solução regex encontarda no Stackoverflow em
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  // /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i+\.([a-z]+)?$ - funciona com .com.br (exemplo)
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i; // funciona apenas com um . após email (.com)
  return regex.test(String(email).toLowerCase());
};

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  const token = generateToken();

  if (!email) return next({ message: messageError.emailRequerid, status: code.badRequest });

  if (!password) return next({ message: messageError.passwordRequerid, status: code.badRequest });

  if (password.length < 6) {
    return next({ message: messageError.passwordInvalid, status: code.badRequest });
  }
  if (!validateEmail(email)) {
    return next({ message: messageError.emailInvalid, status: code.badRequest });
  }

  return res.status(code.ok).json({ token });
});

module.exports = router;