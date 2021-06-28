const Result = require('./result');

/**
 * @param { string } email 
 */
function emailValidator(email) {
    if (!email) {
        return Result.fail('O campo "email" é obrigatório');
    }
    if (!RegExp('.+@.+\\..+').test(email)) {
        return Result.fail('O "email" deve ter o formato "email@email.com"');
    }
    return Result.ok();
}

/**
 * @param { string } password 
 */
function passwordValidator(password) {
    if (!password) {
        return Result.fail('O campo "password" é obrigatório');
    }
    if (password.length < 6) {
        return Result.fail('O "password" deve ter pelo menos 6 caracteres');
    }
    return Result.ok();
}

module.exports = { passwordValidator, emailValidator };