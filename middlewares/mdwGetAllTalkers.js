const { getAllTalkers } = require('../services/talkerService');

const mdwGetAllTalkers = async (_req, res, next) => {
  const data = await getAllTalkers();
  if (data.message) { return next(data); }
  return res.status(200).json(data);
};

module.exports = mdwGetAllTalkers;
