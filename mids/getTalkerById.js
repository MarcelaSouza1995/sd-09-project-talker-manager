const talkers = require('../talker.json');

const getTalkerById = (req, res, next) => {
    const { id } = req.params;

    const talkerResponse = talkers.find((talker) => (
       talker.id === Number(id)
    ));

    if (!talkerResponse) {
        return next({
            status: 404,
            message: 'Error: talker not found',
        });
    }

    return res.status(200).json(talkerResponse);
};

module.exports = getTalkerById;
