const { saveOneTalker } = require('../services/talkerService');

const mdwAddOneTalker = async (req, res, next) => {
  const data = await saveOneTalker(req);
  if (data.message) { return next(data); }
  return res.status(201).json(data);
};

module.exports = mdwAddOneTalker;