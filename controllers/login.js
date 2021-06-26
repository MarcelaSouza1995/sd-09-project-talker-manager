const express = require('express');

const crypto = require('crypto');

const verifyEmail = require('../middlewares/verifyEmail');
const verifyPassword = require('../middlewares/verifyPassword');

const loginRouter = express.Router();
const token = crypto.randomBytes(8).toString('hex');

loginRouter.post('/', verifyEmail, verifyPassword, (req, res) => {
    res.status(200).json({ token });
});

module.exports = loginRouter;
