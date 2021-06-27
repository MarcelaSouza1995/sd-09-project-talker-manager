const router = require('express').Router();
const talkerController = require('../controllers/talkerController');
const middlewares = require('../middlewares');

// Lista todos os talkers
router.get('/talker', talkerController.getTalkers);

// Lista talker por ID
router.get('/talker/:id', talkerController.getTalkerById);

// Cria talker
router.post('/talker', middlewares.authentication.bearer, talkerController.createTalker);

// Edita talker
router.put('/talker/:id', middlewares.authentication.bearer, talkerController.editTalker);

// Deleta talker
router.delete('/talker/:id', middlewares.authentication.bearer, talkerController.deleteTalker);

module.exports = router;
