const express = require('express');

const Router = express.Router();
const { 
  getAllTalkers,
  getTalkerById,
  createTalker,
  verifyToken,
  verifyNewTalker,
} = require('../middlewares');

Router.get('/', getAllTalkers);
Router.get('/:id', getTalkerById);
Router.post('/', verifyToken, verifyNewTalker, createTalker);

module.exports = Router;