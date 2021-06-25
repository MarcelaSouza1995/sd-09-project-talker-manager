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
    if (!talkers.length) throw new Error('Nenhum palestrante encontrado');
    return talkers;
};

const findTalkerById = async (id) => {
    const talkers = await readTalkersFile();
    const talker = talkers.find((element) => element.id === Number(id));

    if (!talker) throw new Error('Pessoa palestrante não encontrada');

    return talker;
};

module.exports = {
    getTalkers,
    findTalkerById,
};
