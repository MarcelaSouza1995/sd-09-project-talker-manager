const generateToken = require('../service/tokenGenerator');

const loginMiddleware = (req, res, next) => {
  const token = generateToken();
  const { email, password } = req.body;
  const emailRegex = /^[\w]+@[a-z]+.([a-z]{2,3}.?){1,2}$/g;
  const passwordRegex = /^.{6,}$/g;
  if (!email) {
    return next({ code: 400, message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return next({ code: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return next({ code: 400, message: 'O campo "password" é obrigatório' });
  }
  if (!passwordRegex.test(password)) {
    return next({ code: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  console.log(token);
  res.status(200).json({ token });
};

module.exports = loginMiddleware;
