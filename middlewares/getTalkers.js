const fs = require('fs').promises;

const getTalkers = async (_req, res, _next) => {
  try {
    const file = await fs.readFile('./talker.json', 'utf8');
    const fileParsed = await JSON.parse(file);
    if (file.length === 0) {
      return res.status(200).send(JSON.parse([]));
    }
    return res.status(200).json(fileParsed);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTalkers;