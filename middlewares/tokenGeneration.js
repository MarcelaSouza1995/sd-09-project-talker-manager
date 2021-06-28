const Rand = () => Math.random(0).toString(36).substr(2);
const generateToken = (length) => (Rand() + Rand() + Rand() + Rand()).substr(0, length);
const token = generateToken(16);

module.exports = token;