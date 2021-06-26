const express = require('express');

const Router = express.Router();
const { loginValidator, tokenGenerator } = require('../middlewares');

Router.post('/', loginValidator, tokenGenerator);

module.exports = Router;