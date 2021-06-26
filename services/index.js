const fs = require('fs').promises;

module.exports = {
    dataTalkers: async () => {
        try {
            const file = await fs.readFile('./talker.json', 'utf8');
            return file.length !== 0 ? JSON.parse(file) : [];
        } catch (error) {
            return ({ code: 500, message: `${error}` });
        }
    },
};