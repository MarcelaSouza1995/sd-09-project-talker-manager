const fs = require('fs/promises');

const getTalkers = async () => JSON.parse(
  await fs.readFile('./talker.json', 'utf-8'),
);

getTalkers().then((item) => console.log(item));

module.exports = getTalkers;