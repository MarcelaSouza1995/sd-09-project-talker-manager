const router = require('express').Router();
const middlewares = require('../middlewares');
const userAccess = require('../controllers/userAccessController');

// Realiza login da pessoa usuária
router.post('/login', middlewares.authentication.local, userAccess.login);

module.exports = router;
