const fs = require('fs').promises;

const readTalkersFile = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf-8', (err, data) => {
        if (err) throw err;
        return data;
      });
    return JSON.parse(talkers);
};

const getTalkers = async () => {
    const talkers = await readTalkersFile();
    return talkers;
};

module.exports = {
    getTalkers,
};
