const fs = require('fs/promises');

const getData = () => fs.readFile('talker.json', 'utf8').then((data) => JSON.parse(data));

module.exports = getData;
