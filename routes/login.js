const express = require('express');
const loginMiddleware = require('../middleware/loginMiddleware');

const app = express();

app.post('/login', loginMiddleware);

module.exports = app;