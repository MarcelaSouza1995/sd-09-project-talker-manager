const express = require('express');

const Router = express.Router();
const { getAllTalkers } = require('../midlewares');

Router.get('/', getAllTalkers);

module.exports = Router;