const fs = require('fs/promises');

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const errorObj = {
      code: error.status || 500,
      message: error.message,
    };
    return errorObj;
  }
}

async function getTalkerById(id) {
  try {
    const data = await getAllTalkers();
    if (data.code) throw new Error(data.message);
    const talkerData = data.find((talker) => talker.id === Number(id));
    if (!talkerData) throw new Error(talkerData);
      console.log('leu arquivo', talkerData);
      return talkerData;
  } catch (error) {
    const errorObj = {
      code: error.status || 500,
      message: error.message,
    };
    return errorObj;
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
};
