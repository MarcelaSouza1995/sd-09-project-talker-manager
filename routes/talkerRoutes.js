const router = require('express').Router();

const middlewares = require('../middlewares');

const { validateTalkerName,
  validateTalkerAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
  validateToken } = require('../validations');

  router.get('/talker/search', validateToken, middlewares.searchTalker);

  router.get('/talker', middlewares.getAllTalkers);
  
  router.get('/talker/:id', middlewares.getTalkerById);

  router.post('/talker', 
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  middlewares.createTalker);

  router.put('/talker/:id', 
validateToken,
validateTalkerName,
validateTalkerAge,
validateTalk,
validateWatchedAt,
validateRate,
middlewares.editTalker);

router.delete('/talker/:id', validateToken, middlewares.deleteTalker);

module.exports = router;