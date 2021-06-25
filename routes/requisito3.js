/*
3 - Crie o endpoint POST /login
Os seguintes pontos serão avaliados:
O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres que deverá ser utilizado nas demais requisições.

O endpoint deverá o retornar o token gerado, da seguinte forma:
{
  "token": "7mqaVRXJSp886CGr"
}
O corpo da requisição deverá ter o seguinte formato:

{
  "email": "email@email.com",
  "password": 123456
}
O campo email deverá ser um email válido. Ele é obrigatório.

Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

{
  "message": "O campo \"email\" é obrigatório"
}
Caso o email passado não seja um email válido retorne um código de status 400, com o seguinte corpo:

{
  "message": "O \"email\" deve ter o formato \"email@email.com\""
}
O campo password deverá ter pelo menos 6 caracteres.

Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

{
  "message": "O campo \"password\" é obrigatório"
}
Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400, com o seguinte corpo:

{
  "message": "O \"password\" deve ter pelo menos 6 caracteres"
}
*/

const express = require('express');

const router = express.Router();
const { getToken } = require('../services');

const emailAuthentication = () => (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) return next({ message: 'o campo "email" é obrigatório' });

  if (!email.match(emailRegex)) {
    return next({
      message: 'O campo "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const passwordAuthentication = () => (req, _res, next) => {
  const { password } = req.body;

  if (!password) return next({ message: 'o campo "email" é obrigatório' });

  if (password.length < 6) {
    return next({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const handleErrorMiddleware = () => (err, _req, res, _next) => {
  res.status(400).json({ message: err.message });
};

const generateToken = () => (_req, res) => {
  const token = getToken();

  res.status(200).json({ token });
};

router.post('/', [
  emailAuthentication(),
  passwordAuthentication(),
  generateToken(),
  handleErrorMiddleware(),
]);

module.exports = router;
