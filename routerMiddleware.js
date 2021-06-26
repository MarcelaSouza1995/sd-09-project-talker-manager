const express = require('express');

const router = express.Router();

router.get('/homer', (req, res) => {
  res.send('Hello Homer!');
});

router.get('/marge', (req, res) => {
  res.send('Hello Marge!');
});

router.get('/liza', (req, res) => {
  res.send('Hello Liza!');
});

router.get('/bart', (req, res) => {
  res.send('Hello El Barto!');
});

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

router.get('/', (req, res) => {
    res.send(talker);
  });

module.exports = router;