const fs = require('fs');
const path = require('path');

const getAllPersons = (req, res) => {
    const emptyArray = 0;
    const file = path.join(__dirname, '..', 'talker.json');

    fs.readFile(file, (err, data) => {
        if (err) return err;
        const result = JSON.parse(data);
        if (result.length === emptyArray) return res.status(200).json([]);
        return res.status(200).json(result);
    });
};

module.exports = getAllPersons;
