const router = require('express').Router();
const talkerController = require('../controllers/talkerController');

router.get('/talker', talkerController.getTalkers);

module.exports = router;
