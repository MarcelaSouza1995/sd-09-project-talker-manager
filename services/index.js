const fs = require('fs').promises;

module.exports = {
    dataTalkers: async (fileName) => {
        try {
            const file = await fs.readFile(`./${fileName}`, 'utf8');
            return file.length !== 0 ? JSON.parse(file) : [];
        } catch (error) {
            return ({ code: 500, message: `${error}` });
        }
    },
    getById: async (data, id) => {
        try {
            return data.find((talker) => talker.id === Number(id));
        } catch (error) {
            return ({ code: 500, message: `${error}` });
        }
    },
};