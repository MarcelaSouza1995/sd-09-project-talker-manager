// const fs = require('fs');
const express = require('express');
// const talker = require('../../talker.json');
const middlewares = require('../middlewares/talker');

const router = express.Router();

router.get('/', middlewares.endpointTalker);

module.exports = router;