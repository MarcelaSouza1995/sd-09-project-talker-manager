const router = require('express').Router();
const talkerController = require('../controllers/talkerController');

// Lista todos os talkers
router.get('/talker', talkerController.getTalkers);

// Lista talker por ID
router.get('/talker/:id', talkerController.getTalkerById);

module.exports = router;
