const { getOneTalker } = require('../services/talkerService');

const mdwGetOneTalker = async (req, res, next) => {
  const idNumber = Number(req.params.id);
  const data = await getOneTalker(idNumber);
  if (data.message) { return next(data); }
  return res.status(200).json(data);
};

module.exports = mdwGetOneTalker;
