const rescue = require('express-rescue');

// https://www.w3resource.com/javascript/form/email-validation.php
function validateEmail(email) {
    const regexValEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexValEmail.test(email);
}

// https://stackoverflow.com/questions/3166738/minimum-6-characters-regex-expression/3167082
function validatePassword(password) {
    const regexValPass = /^.{6,}$/;
    return regexValPass.test(password);
}

module.exports = rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!isValidEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (!isValidPassword) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next(); 
});