/*
6 - Crie o endpoint DELETE /talker/:id
Os seguintes pontos serão avaliados:
A requisição deve ter o token de autenticação nos headers.

Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token não encontrado"
}
Caso o token seja inválido retorne um código de status 401, com o seguinte corpo:

{
  "message": "Token inválido"
}
O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200, com o seguinte corpo:

{ "message": "Pessoa palestrante deletada com sucesso" }
*/

const express = require('express');
const rescue = require('express-rescue');

const { getTalkers, setTalkers } = require('../services');

const router = express.Router();

const {
  tokenAuthentication,
  handleErrorMiddleware,
} = require('../middlewares');

router.delete('/:id', [
  tokenAuthentication(),
  rescue(async (req, res) => {
    const { id: paramId } = req.params;
    const talkersList = await getTalkers();
    const filteredTalkersList = talkersList.filter(
      ({ id }) => id !== parseInt(paramId, 10),
    );

    await setTalkers(filteredTalkersList);

    res
      .status(200)
      .json({ message: 'Pessoa palestrante deletada com sucesso' });
  }),
  handleErrorMiddleware(),
]);

module.exports = router;
