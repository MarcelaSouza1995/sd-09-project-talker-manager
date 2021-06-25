const fs = require('fs/promises');

const rescue = require('express-rescue');

const pathTalker = './talker.json';
const HTTP_OK_STATUS = 200;

const readFileMiddleware = rescue(async (req, res, next) => {
    const data = await fs.readFile(pathTalker, 'utf8')
    .then((result) => JSON.parse(result))
    .catch((error) => next(error));

    if (data.length === 0) {
       return res.status(HTTP_OK_STATUS).json([]);
    }

   return res.status(200).json(data);
});

module.exports = readFileMiddleware;