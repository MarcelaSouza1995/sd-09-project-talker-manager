const express = require('express');

const Router = express.Router();
const { getAllTalkers, getTalkerById } = require('../middlewares');

Router.get('/', getAllTalkers);
Router.get('/:id', getTalkerById);

module.exports = Router;