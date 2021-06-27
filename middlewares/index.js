const { dataTalkers, getById, loginIsValid } = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_RESQUEST = 400;
const FILE_NAME = 'talker.json';

module.exports = {
    getAllTalkers: async (req, res) => {
        const getFile = await dataTalkers(FILE_NAME);
        return res.status(HTTP_OK_STATUS).json(getFile);
    },
    getTalkerById: async (req, res) => {
        const { id } = req.params;
        const data = await dataTalkers(FILE_NAME);
        const talker = await getById(data, Number(id));
        const result = talker ? res.status(HTTP_OK_STATUS).json(talker)
            : res.status(HTTP_NOT_FOUND).json(
                { message: 'Pessoa palestrante não encontrada' },
            );
        return result;
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email) {
            res.status(HTTP_BAD_RESQUEST).json({
                message: 'O campo "email" é obrigatório',
            });
        }
        if (!password) {
            res.status(HTTP_BAD_RESQUEST).json({
                message: 'O campo "password" é obrigatório',
            });
        }
        loginIsValid(req, res);
    },
};