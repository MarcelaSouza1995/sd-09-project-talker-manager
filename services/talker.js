const fs = require('fs').promises;

const getTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf-8', (err, data) => {
        if (err) throw err;
        return data;
      });
    return JSON.parse(talkers);
};

module.exports = {
    getTalkers,
};
