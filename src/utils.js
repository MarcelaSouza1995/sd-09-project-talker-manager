const crypto = require('crypto');

function generetaToken() {
    return crypto.randomBytes(16).toString('utf-8');
}

module.exports = generetaToken;