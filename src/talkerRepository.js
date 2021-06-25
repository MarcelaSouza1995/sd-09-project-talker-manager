const fs = require('fs');

function findAll() {
    const fileContent = fs.readFileSync('./talker.json', { encoding: 'utf8' });
    return JSON.parse(fileContent);
}

function findById(id) {
    return findAll().find((talker) => talker.id === +id);
}

module.exports = { findAll, findById };