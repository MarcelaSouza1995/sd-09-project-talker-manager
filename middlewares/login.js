const { generateToken } = require('../services');

const login = (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
};

module.exports = login;
