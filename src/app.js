const router = require('express').Router();
const loginValidator = require('./loginValidator');
const tokenValidator = require('./tokenValidator');
const talkerRepository = require('./talkerRepository');
const generetaToken = require('./utils');
const createTalkerValidator = require('./createTalkerValidator');

router.get('/talker', (_req, res) => {
    const talkers = talkerRepository.findAll();
    return res.status(200).json(talkers);
});

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const talker = talkerRepository.findById(id);
    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
});

router.post('/login', loginValidator, (req, res) => {
    const token = generetaToken();
    res.status(200).json({ token });
});

router.post('/talker', tokenValidator, createTalkerValidator, (req, res) => {
    const { name, age, talk } = req.body;
    const createdTalker = talkerRepository.insert({ name, age, talk });
    res.status(201).json(createdTalker);
});

module.exports = router;