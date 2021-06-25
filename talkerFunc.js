const fs = require('fs').promises;

const readTalker = () => fs.readFile('./talker.json', 'utf-8')
    .then((file) => JSON.parse(file));

const writeTalker = (data) => fs.writeFile('./talker.json', JSON.stringify(data));

module.exports = { readTalker, writeTalker };