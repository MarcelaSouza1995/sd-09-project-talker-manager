const fs = require('fs').promises;

const rescue = require('express-rescue');

const talkerPath = './talker.json';

const HTTP_OK_STATUS = 200;

const NOT_FOUND = 404;

const findTalker = rescue(async (req, res) => {
    const data = await fs.readFile(talkerPath, 'utf8')
    .then((result) => JSON.parse(result));

    const { id } = req.params;
    
    const filteredTalker = data.find((talker) => talker.id === +(id));

    console.log(filteredTalker);

    if (!filteredTalker) {
        return res.status(NOT_FOUND).json({
            message: 'Pessoa palestrante não encontrada', 
        });
    }

    return res.status(HTTP_OK_STATUS).json(filteredTalker);
});

module.exports = findTalker;