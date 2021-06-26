/*
5 - Crie o endpoint PUT /talker/:id
Os seguintes pontos serão avaliados:
O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

O corpo da requisição deverá ter o seguinte formato:

{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
A requisição deve ter o token de autenticação nos headers.

Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token não encontrado"
}
Caso o token seja inválido retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token inválido"
}
O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.

Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

{
  "message": "O campo \"name\" é obrigatório"
}
Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400, com o seguinte corpo:

{
  "message": "O \"name\" ter pelo menos 3 caracteres"
}
O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.

Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

{
  "message": "O campo \"age\" é obrigatório"
}
Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo:

{
  "message": "A pessoa palestrante deve ser maior de idade"
}
O campo talk deverá ser um objeto com as seguintes chaves:

A chave watchedAt deve ser uma data no formato dd/mm/aaaa.

Caso a data não respeito o formato dd/mm/aaaa retorne status 400, com o seguinte corpo:
{
  "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
}
A chave rate deve ser um inteiro de 1 à 5.

Caso a nota não seja um inteiro de 1 à 5 retorne status 400, com o seguinte corpo:

{
  "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
}
O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo:

{
  "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"
}
Caso esteja tudo certo, retorne o status 200 e a pessoa editada.

O endpoint deve retornar o status 200 e a pessoa palestrante que foi editada, da seguinte forma:

{
  "id": 1,
 "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 4
  }
}
*/

const express = require('express');
const rescue = require('express-rescue');

const { getTalkers, setTalkers } = require('../services');

const router = express.Router();

const tokenAuthentication = () => (req, _res, next) => {
  const { authorization } = req.headers;
  const errorType = 401;

  if (!authorization) return next({ errorType, message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    return next({ errorType, message: 'Token inválido' });
  }

  next();
};

const nameAuthentication = () => (req, _res, next) => {
  const { name } = req.body;
  const errorType = 400;

  if (!name) {
    return next({ errorType, message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return next({
      errorType,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const ageAuthentication = () => (req, _res, next) => {
  const { age } = req.body;
  const errorType = 400;

  if (!age) {
    return next({ errorType, message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return next({
      errorType,
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const talkAuthentication = () => (req, _res, next) => {
  const { talk } = req.body;
  const errorType = 400;

  if (!talk) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const watchedAtAuthentication = () => (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;
  const errorType = 400;
  const dateFormatRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!watchedAt) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!watchedAt.match(dateFormatRegex)) {
    return next({
      errorType,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const rateAuthentication = () => (req, _res, next) => {
  const { talk: { rate } } = req.body;
  const errorType = 400;
  if (rate === undefined) {
    return next({
      errorType,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (rate < 1 || rate > 5 || rate !== Math.round(rate)) {
    return next({
      errorType,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const updateTalker = () => rescue(async (req, res) => {
  const { id: paramId } = req.params;
  const talkersList = await getTalkers();
  const filteredTalkersList = talkersList.filter(({ id }) => id !== parseInt(paramId, 10));
  const updatedTalker = { ...req.body, id: parseInt(paramId, 10) };

  const updatedTalkersList = [...filteredTalkersList, updatedTalker];

  await setTalkers(updatedTalkersList);

  res.status(200).json(updatedTalker);
});

const handleErrorMiddleware = () => (err, _req, res, _next) => {
  res.status(err.errorType).json({ message: err.message });
};

router.put('/:id', [
  tokenAuthentication(),
  nameAuthentication(),
  ageAuthentication(),
  talkAuthentication(),
  watchedAtAuthentication(),
  rateAuthentication(),
  updateTalker(),
  handleErrorMiddleware(),
]);

module.exports = router;
