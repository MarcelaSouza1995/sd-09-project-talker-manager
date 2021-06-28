function generetaToken() {
    return Date.now().toString() + Math.random().toPrecision(3).slice(2);
}

module.exports = generetaToken;