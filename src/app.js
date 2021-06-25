const router = require('express').Router();
const talkerRepository = require('./talkerRepository');

router.get('/talker', (_req, res) => {
    const talkers = talkerRepository.findAll();
    return res.status(200).json(talkers);
});

module.exports = router;