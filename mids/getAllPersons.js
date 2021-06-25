const fs = require('fs');

const getAllPersons = (req, res) => {
    const emptyArray = 0;

    fs.readFile('./talker.json', (err, data) => {
        if (err) return err;
        const result = JSON.parse(data);
        if (result.length === emptyArray) return res.status(200).json([]);
        return res.status(200).json(result);
    });
};

module.exports = getAllPersons;
