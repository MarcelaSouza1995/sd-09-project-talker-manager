const express = require('express');

const router = express.Router();

const talker = [
    {
        name: 'Henrique Albuquerque',
        age: 62,
        id: 1,
        talk: {
            watchedAt: '23/10/2020',
            rate: 5,
        },
    },
    {
        name: 'Heloísa Albuquerque',
        age: 67,
        id: 2,
        talk: {
            watchedAt: '23/10/2020',
            rate: 5,
        },
    },
    {
        name: 'Ricardo Xavier Filho',
        age: 33,
        id: 3,
        talk: {
            watchedAt: '23/10/2020',
            rate: 5,
        },
    },
    {
        name: 'Marcos Costa',
        age: 24,
        id: 4,
        talk: {
            watchedAt: '23/10/2020',
            rate: 5,
        },
    },
];

// req 1
router.get('/', (req, res) => {
    res.send(talker);
});
// req 2
router.get('/1', (req, res) => {
    res.send(talker[0]);
});
router.get('/2', (req, res) => {
    res.send(talker[1]);
});
router.get('/3', (req, res) => {
    res.send(talker[2]);
});
router.get('/4', (req, res) => {
    res.send(talker[3]);
});

module.exports = router;