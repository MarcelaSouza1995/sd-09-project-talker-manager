const fs = require('fs/promises');

const getAllTalkers = async (req, _res, next) => {
  try {
    req.data = await fs.readFile('./talker.json', 'utf8');
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllTalkers;
