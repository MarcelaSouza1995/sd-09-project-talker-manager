const express = require('express');
const fs = require('fs').promises;
const middleWares = require('../middleWares/index');

const router = express.Router();
const filePath = './talker.json';
// 1 - Crie o endpoint GET /talker
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200.

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(filePath, 'utf8')
    .then((response) => JSON.parse(response));

  res.status(200).json(
    talkers,
  );
});

// 7 - Crie o endpoint GET /talker/search?q=searchTerm
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o status 200.
router.get('/search', middleWares.validateToken, async (req, res) => {
  const searchTerm = req.query.q;

  const talkers = await fs.readFile(filePath, 'utf8')
    .then((data) => JSON.parse(data));

  if (!searchTerm) { return res.status(200).json(talkers); }

  const myTalker = talkers.filter(({ name }) => name.includes(searchTerm));

  if (!myTalker) { return res.status(200).json([]); }

  res.status(200).json(
    myTalker,
  );
});

// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404.
router.route('/:id')
  .all(async (req, res, next) => {
    const myId = Number(req.params.id);
    const talkers = await fs.readFile(filePath, 'utf8')
    .then((response) => JSON.parse(response));

  const myTalker = talkers.find(({ id }) => id === myId);

  if (!myTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const myIndex = talkers.findIndex(({ id }) => id === myId);
  req.id = myId;
  req.talkers = talkers;
  req.talkerIndex = myIndex;
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
    middleWares.regexCheckTalk,
    async (req, res) => {
      const talkers = await fs.readFile(filePath, 'utf8')
        .then((data) => JSON.parse(data));
      req.body.id = talkers.length + 1;
      const newTalker = req.body;
      const newTalkerList = [...talkers, newTalker];

      await fs.writeFile(filePath, JSON.stringify(newTalkerList));

      res.status(201).json(
        newTalker,
      );
  });

  // 5 - Crie o endpoint PUT /talker/:id
  // O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.
  // A requisição deve ter o token de autenticação nos headers.
  // O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
  // O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
router.put('/:id',
  middleWares.validateNameAge,
  middleWares.validateTalk,
  middleWares.regexCheckTalk,
  async (req, res) => {
  const myId = Number(req.params.id);

  const myTalker = { ...req.body, id: myId };
  const { talkers } = req;
  talkers[req.talkerIndex] = myTalker;

  await fs.writeFile(filePath, JSON.stringify(talkers));
  res.status(200).json(
    myTalker,
  );
});

// 6 - Crie o endpoint DELETE /talker/:id
// A requisição deve ter o token de autenticação nos headers.
// O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200,
router.delete('/:id', async (req, res) => {
  const { talkers } = req;

  const newTalkerList = talkers.filter(({ id }) => id !== req.id);

  await fs.writeFile(filePath, JSON.stringify(newTalkerList));

  res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

module.exports = router;
