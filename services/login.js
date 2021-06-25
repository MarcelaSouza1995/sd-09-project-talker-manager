const validateFields = (email, password) => {
    if (!email) throw new Error('O campo "email" é obrigatório');
    if (!email.match(/[^@]+@[^.]+\.com/g)) {
        throw new Error('O "email" deve ter o formato "email@email.com"');
    }

    if (!password) throw new Error('O campo "password" é obrigatório');
    if (password.length < 6) throw new Error('O "password" deve ter pelo menos 6 caracteres');
};

module.exports = {
    validateFields,
};
