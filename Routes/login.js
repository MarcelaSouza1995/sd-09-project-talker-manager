const express = require('express');
const { checkEmail, checkPassword, login } = require('../middlewares');

const route = express.Router();

route.post('/', checkEmail, checkPassword, login);

module.exports = route;
