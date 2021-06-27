const fs = require('fs').promises;

const serverError = (error) => ({ code: 500, message: `${error}` });
const HTTP_OK_STATUS = 200;
const HTTP_BAD_RESQUEST = 400;
const emailValidate = /\S+@\S+\.\S+/;

module.exports = {
    dataTalkers: async (fileName) => {
        try {
            const file = await fs.readFile(`./${fileName}`, 'utf8');
            return file.length !== 0 ? JSON.parse(file) : [];
        } catch (error) {
            return serverError(error);
        }
    },
    getById: async (data, id) => {
        try {
            return data.find((talker) => talker.id === Number(id));
        } catch (error) {
            return serverError(error);
        }
    },
    loginIsValid: (req, res) => {
        const { email, password } = req.body;
        const validEmail = emailValidate.test(email);
        const validPass = (password.length >= 6);
        if (validEmail && validPass) {
            res.status(HTTP_OK_STATUS).json({
                token: '7mqaVRXJSp886CGr',
            });
        }
        if (!validPass) {
            res.status(HTTP_BAD_RESQUEST).json({
                message: 'O "password" deve ter pelo menos 6 caracteres',
            });
        }
        if (!validEmail) {
            res.status(HTTP_BAD_RESQUEST).json({
                message: 'O "email" deve ter o formato "email@email.com"',
            });
        }
    },
};