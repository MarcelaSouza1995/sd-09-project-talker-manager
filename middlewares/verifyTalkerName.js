const verifyTalkerName = (req, res, next) => {
    const { name } = req.body;
    const NAME_NOT_FOUND = 400;

    if (!name || name.length === 0) {
        return res.status(NAME_NOT_FOUND)
        .json({ message: 'O campo "name" é obrigatório' });
    }

    if (name.length < 3) {
        return res.status(NAME_NOT_FOUND)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

module.exports = verifyTalkerName;