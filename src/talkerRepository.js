const fs = require('fs');

function findAll() {
    const fileContent = fs.readFileSync('./talker.json', { encoding: 'utf8' });
    return JSON.parse(fileContent);
}

function findById(id) {
    return findAll().find((talker) => talker.id === +id);
}

function insert({ name, age, talk: { rate, watchedAt } }) {
    const talkers = findAll();
    const talker = { id: talkers.length + 1, name, age, talk: { rate, watchedAt } };
    talkers.push(talker);
    fs.writeFileSync('./talker.json', JSON.stringify(talkers), { encoding: 'utf8' });
    return talker;
}

module.exports = { findAll, findById, insert };