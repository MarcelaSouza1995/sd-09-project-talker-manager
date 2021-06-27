const express = require('express');
const middleware = require('../middleware');

const talkerRouter = express.Router();

talkerRouter.get('/', middleware.getAllTalkers);

talkerRouter.get('/:id', middleware.getTalkerById);

talkerRouter.post('/', (req, res) => { res.status(200).send('POST talker'); });
talkerRouter.put('/:id', (req, res) => { res.status(200).send('PUT talker/id'); });
talkerRouter.delete('/:id', (req, res) => { res.status(200).send('DELETE talker/id'); });
talkerRouter.get('/search?q=searchTerm', (req, res) => { res.status(401).send('GET search'); });

module.exports = talkerRouter;