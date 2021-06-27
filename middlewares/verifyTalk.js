const verifyTalk = (req, res, next) => {
    const { talk } = req.body; 
    const NOT_VALID = 400;

    if (!talk) {
        return res.status(NOT_VALID)
        .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }

    return next();
};

module.exports = verifyTalk;