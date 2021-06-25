const express = require('express');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => res.status(200).json({ Message: 'login' }));

module.exports = loginRouter;