const talkers = require('../talker.json');

const getAllPersons = (req, res) => {
    const emptyArray = 0;
    
    return (
        talkers.length === emptyArray
        ? res.status(200).json([]) 
        : res.status(200).json(talkers)
    );
};

module.exports = getAllPersons;
