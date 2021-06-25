const { getData } = require('../services');

const getAllTalkers = (_req, res) => getData().then((e) => res.status(200).json(e));

module.exports = getAllTalkers;
