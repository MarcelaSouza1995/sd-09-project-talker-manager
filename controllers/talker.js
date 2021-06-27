const readFile = require('../services/readFile');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const TALKERS_FILE = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const talkersList = await readFile(TALKERS_FILE);
  res.status(HTTP_OK_STATUS).json(talkersList);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(TALKERS_FILE);

  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!foundTalker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(foundTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
