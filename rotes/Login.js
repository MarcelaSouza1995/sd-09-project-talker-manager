const express = require('express');

const Router = express.Router();
const { verifyLogin, tokenGenerator } = require('../middlewares');

Router.post('/', verifyLogin, tokenGenerator);

module.exports = Router;