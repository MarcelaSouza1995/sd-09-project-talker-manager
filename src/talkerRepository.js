const fs = require('fs');

function findAll() {
    const fileContent = fs.readFileSync('./talker.json', { encoding: 'utf8' });
    return JSON.parse(fileContent);
}

module.exports = { findAll };