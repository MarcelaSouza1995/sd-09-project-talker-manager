const readFile = require('../services/readFile');

const OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const TALKERS_FILE = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const talkersList = await readFile(TALKERS_FILE);
  return res.status(OK_STATUS).json(talkersList);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(TALKERS_FILE);
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 10));

  if (!foundTalker) {
    return res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(OK_STATUS).json(foundTalker);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
