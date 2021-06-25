const router = require('express').Router();
const talkerRepository = require('./talkerRepository');

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

module.exports = router;