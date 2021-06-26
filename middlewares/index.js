const HTTP_OK_STATUS = 200;
const { dataTalkers } = require('../services');

module.exports = {
    getAllTalkers: async (req, res) => {
        const getFile = await dataTalkers();
        return res.status(HTTP_OK_STATUS).json(getFile);
    },
};