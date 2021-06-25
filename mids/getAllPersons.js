const talkers = require('../talker.json');

const getAllPersons = (req, res) => {
    const emptyArray = 0;
    return (
        talkers.length === emptyArray || !talkers
        ? res.status(200).send([])
        : res.status(200).json(talkers)
    );
};

module.exports = getAllPersons;
