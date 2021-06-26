/*
7 - Crie o endpoint GET /talker/search?q=searchTerm
Os seguintes pontos serão avaliados:
O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o status 200, com o seguinte corpo:

/search?q=Da
[
  {
    id: 1,
    name: "Danielle Santos",
    age: 56,
    talk: {
      watchedAt: "22/10/2019",
      rate: 5,
    },
  }
];
A requisição deve ter o token de autenticação nos headers.

Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token não encontrado"
}
Caso o token seja inválido retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token inválido"
}
Caso searchTerm não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET /talker, com um status 200.

Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o status 200 e um array vazio.
*/

const express = require('express');
const rescue = require('express-rescue');

const { getTalkers } = require('../services');

const router = express.Router();

const {
  tokenAuthentication,
  handleErrorMiddleware,
} = require('../middlewares');

router.get('/', [
  tokenAuthentication(),
  rescue(async (req, res) => {
    const { q: query } = req.query;
    const talkersList = await getTalkers();
    const foundTalker = talkersList.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase()));

    if (!query) {
      return res.status(200).json(talkersList);
    }

    res.status(200).json(foundTalker);
  }),
  handleErrorMiddleware(),
]);

module.exports = router;
