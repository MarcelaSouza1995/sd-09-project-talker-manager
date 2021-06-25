/*
2 - Crie o endpoint GET /talker/:id
O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo:

{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": { "watchedAt": "23/10/2020", "rate": 5 }
}
Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo:

{
  "message": "Pessoa palestrante não encontrada"
}
*/

const express = require('express');
const rescue = require('express-rescue');
const getTalkers = require('../services/talker-utils');

const router = express.Router();

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id: paramId } = req.params;

    const talkersList = await getTalkers();
    const talker = talkersList.find(({ id }) => id === parseInt(paramId, 10));

    if (!talker) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
  }),
);

module.exports = router;
