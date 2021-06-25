const fs = require('fs').promises;

function getTalkManagers() {
    return fs.readFile('./talker.json', 'utf-8')
        .then((file) => JSON.parse(file));
}

function setTalkManagers(newTalkManager) {
    return fs.writeFile('./talker.json', JSON.stringify(newTalkManager));
}

module.exports = {
    getTalkManagers,
    setTalkManagers,
};