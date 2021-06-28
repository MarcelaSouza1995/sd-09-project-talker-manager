// const crypto = require('crypto');
const rescue = require('express-rescue');

// https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function generateToken(length) {
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    const b = [];
    for (let i = 0; i < length; i += 1) {
        const j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join('');
}

// https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
module.exports = rescue(async (_req, res) => {
    const token = generateToken(16);
    return res.status(200).json({ token });
});
