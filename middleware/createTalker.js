const fs = require('fs').promises;
const path = require('path');
const token = require('./randomToken');

const filePath = path.join(__dirname, '..', 'talker.json');

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing authorization header' });
  }
  next();
};

const createTalker = async (req, res) => {
  const talkers = await fs.readFile(filePath, 'utf8')
    .then((result) => JSON.parse(result));

  talkers.push({
    name: 'Danielle Santos',
    age: 56,
    talk: {
      watchedAt: '22/10/2019',
      rate: 5,
    },
  });

  res.status(201).json(talkers);
};

module.exports = { createTalker, authMiddleware };