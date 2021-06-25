// const { v4 } = require('uuid');
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const validEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = regex.test(email);
        
    if (!email) return { status: 400, message: 'O campo "email" é obrigatório' };

    if (!isValidEmail) {
       return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
    }

    return false;
};

const validPassword = (password) => {
    if (!password || password.length === 0) { 
        return { status: 400, message: 'O campo "password" é obrigatório' }; 
    }

    if (password.length < 6) {
        return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
    }

    return false;
};

const login = (req, res, next) => {
    // const myuuid = v4();
    // const token = myuuid.slice(16);
    const token = generateToken();

    const { email, password } = req.body;
    
    if (validEmail(email)) return next(validEmail(email));

    if (validPassword(password)) return next(validPassword(password));

    return res.status(200).json({ token });
};

module.exports = login;
