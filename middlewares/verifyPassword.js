function verifyPassword(req, res, next) {
    const INVALID = 400;
    const { password } = req.body;
    
    if (!password || password.length === 0) {
        return res.status(INVALID)
        .json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(INVALID)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
}

module.exports = verifyPassword;