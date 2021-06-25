const { Router } = require('express');

const { readTalkerFile } = require('../helpersFunctions/helpers');

const talkerRouter = Router();

talkerRouter.get('/', (req, res) => {
  readTalkerFile('talker.json')
    .then((result) => res.status(200).json(result))
    .catch((_err) => res.status(200).json([]));
});

module.exports = talkerRouter;
