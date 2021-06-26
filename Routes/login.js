const express = require('express');
const { checkEmail, checkPassword, login } = require('../middlewares');

const app = express.Router();

app.post('/', checkEmail, checkPassword, login);

module.exports = app;
