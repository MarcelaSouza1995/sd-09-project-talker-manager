const verifyWatchedAt = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    const NOT_VALID = 400;
    const dateRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);

    if (!watchedAt) {
        return res.status(NOT_VALID)
        .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }

    if (!dateRegex.test(watchedAt)) {
        return res.status(NOT_VALID)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
};

module.exports = verifyWatchedAt;