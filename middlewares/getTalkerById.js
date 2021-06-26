const { getData, message } = require('../services');

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talker = await getData().then((arr) => arr.find((e) => e.id === +id));
  if (!talker) return res.status(404).json({ message: message.talkerNotFound });
  return res.status(200).json(talker);
};

module.exports = getTalkerById;
