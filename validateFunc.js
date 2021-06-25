const validationEmail = (req, res, next) => {
    const { email } = req.body;
    const re = /\S+@\S+\.\S+/;
    if (!email || email.length === 0) {
        return res.status(401).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!re.test(email)) {
        return res.status(401).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

const validationPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length === 0) {
        return res.status(401).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 5) {
        return res.status(401).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

module.exports = { validationEmail, validationPassword };