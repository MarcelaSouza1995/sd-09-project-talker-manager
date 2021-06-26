const { getData, errorMessage } = require('../services');

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talker = await getData().then((arr) => arr.find((e) => e.id === +id));
  if (!talker) res.status(404).json({ message: errorMessage.talkerNotFound });
  res.status(200).json(talker);
};

module.exports = getTalkerById;
