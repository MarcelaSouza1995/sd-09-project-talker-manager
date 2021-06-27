const router = require('express').Router();

const talker = require('./talker');
// const login = require('./login');

router.use(talker);
// router.use(login);

module.exports = router;
