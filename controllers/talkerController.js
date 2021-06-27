const fs = require('fs');
const { FileError } = require('../errors');

const talkersFile = 'talker.json';

module.exports = {
  getTalkers(req, res) {
    try {
      const talkersData = fs.readFileSync(talkersFile, 'utf8');
      if (talkersData.length > 0) {
        res.status(200).json(JSON.parse(talkersData));
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      throw new FileError(talkersFile);
    }
  },
  getTalkerById(req, res) {

  },
};