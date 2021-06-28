// const fs = require('fs');
const express = require('express');
// const talker = require('../../talker.json');
const middlewares = require('../middlewares/login');

const router = express.Router();

router.post('/', middlewares.endpointLogin);

module.exports = router;