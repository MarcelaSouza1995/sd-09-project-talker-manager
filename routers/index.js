const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const talkerRouter = express.Router();

// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo.
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
talkerRouter.get('/', async (req, res) => {
   const talkers = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf8')
    .then((result) => JSON.parse(result));

   if (talkers.length === 0) return res.status(200).json([]);
  res.status(200).json(talkers);
});

// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo.
// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo.
talkerRouter.get('/:id', (req, res) => {
 res.status(200).json({});
});

talkerRouter.post('/login', (req, res) => { res.status(200).send('POST login'); });
talkerRouter.post('/', (req, res) => { res.status(200).send('POST talker'); });
talkerRouter.put('/:id', (req, res) => { res.status(200).send('PUT talker/id'); });
talkerRouter.delete('/:id', (req, res) => { res.status(200).send('DELETE talker/id'); });
talkerRouter.get('/search?q=searchTerm', (req, res) => { res.status(200).send('GET search'); });

module.exports = talkerRouter;