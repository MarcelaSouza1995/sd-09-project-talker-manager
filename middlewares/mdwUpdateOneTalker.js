const { updateOneTalker } = require('../services/talkerService');

const mdwUpdateOneTalker = async (req, res, next) => {
  const data = await updateOneTalker(req);
  if (data.message) { return next(data); }
  return res.status(200).json(data);
};

module.exports = mdwUpdateOneTalker;