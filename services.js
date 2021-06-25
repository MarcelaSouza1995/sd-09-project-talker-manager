const fs = require('fs').promises;

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const errorObj = {
      status: error.status || 500,
      message: error.message,
    };
    return errorObj;
  }
}

async function getTalkerById(id) {
  try {
    const data = await getAllTalkers();
    const talkerData = data.find((talker) => talker.id === Number(id));
    if (!talkerData) throw new Error();
      return talkerData;
  } catch (error) {
    const errorObj = {
      status: 404,
      message: 'Pessoa palestrante não encontrada',
    };
    return errorObj;
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
};
