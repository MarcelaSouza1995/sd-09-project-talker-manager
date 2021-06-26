const fs = require('fs/promises');

const desafio1 = async () => {
    try {
        const file = await fs.readFile('./talker.json', 'utf8');
        return file.length !== [] ? JSON.parse(file) : [];
    } catch (error) {
        return ({ code: 500, message: `${error}` });
    }
};

module.exports = desafio1;
