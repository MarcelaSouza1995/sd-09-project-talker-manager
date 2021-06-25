const express = require('express');
const fs = require('fs/promises');
const middleWares = require('../middleWares/index');

const router = express.Router();

// 1 - Crie o endpoint GET /talker
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200.

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));

  res.status(200).json(
    talkers,
  );
});

// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404.
router.route('/:id')
  .all(async (req, res, next) => {
    const myId = Number(req.params.id);

    const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));

  const myTalker = talkers.find(({ id }) => id === myId);

  if (!myTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  req.myTalker = myTalker;

  next();
  })
  // 2 - Crie o endpoint GET /talker/:id
  // O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1.
  .get((req, res) => {
    res.status(200).json(
      req.myTalker,
    );
  });

  router.use(middleWares.validateToken);

  // 4 - Crie o endpoint POST /talker
  //  O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;
  //  O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
  //  O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
  //  O campo talk deverá ser um objeto com as seguintes chaves:
  //    A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
  //    A chave rate deve ser um inteiro de 1 à 5.
  //    O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

  router.post('/',
    middleWares.validateNameAge,
    middleWares.validateTalk,
    middleWares.regexChecktalk,
    async (req, res) => {
      const talkers = await fs.readFile('./talker.json', 'utf8')
        .then((data) => JSON.parse(data));
      req.body.id = talkers.length + 1;
      const newTalker = req.body;
      const newTalkerList = [...talkers, newTalker];

      await fs.writeFile('./talker.json', JSON.stringify(newTalkerList));

      res.status(201).json(
        newTalker,
      );
  });

module.exports = router;
