const router = require('express').Router();

const talker = require('./talker');
const userAccess = require('./userAccess');

router.use(talker);
router.use(userAccess);

module.exports = router;
