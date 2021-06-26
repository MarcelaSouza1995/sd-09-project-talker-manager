function verifyEmail(req, res, next) {
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const INVALID = 400;
    const { email } = req.body;
    
    if (!email || Object.values(email).length === 0) {
        return res.status(INVALID)
        .json({ message: 'O campo "email" é obrigatório' });
    }

    if (!emailRegex.test(email)) {
        return res.status(INVALID)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
}

module.exports = verifyEmail;