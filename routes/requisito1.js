/*
1 - Crie o endpoint GET /talker
O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas
*/

const express = require('express');
const rescue = require('express-rescue');
const getTalkers = require('../services/talker-utils');

const router = express.Router();

router.get(
  '/',
  rescue(async (_req, res) => {
    const talkersList = await getTalkers();

    res.status(200).json(talkersList);
  }),
);

module.exports = router;
