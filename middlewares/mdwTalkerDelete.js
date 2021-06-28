const { deleteOneTalker } = require('../services/talkerService');

const mdwTalkerDelete = async (req, res, next) => {
  const data = await deleteOneTalker(req);
  if (data) { return next(data); }
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = mdwTalkerDelete;