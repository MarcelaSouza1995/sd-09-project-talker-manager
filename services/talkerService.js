const fs = require('fs').promises;

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json');
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

async function getOneTalker(idNumber) {
  try {
    const data = await getAllTalkers();
    if (data.message) { return data; }
    const oneTalkerData = data.find((talker) => talker.id === idNumber);
    if (!oneTalkerData) throw new Error('Pessoa palestrante não encontrada');
    return oneTalkerData;
  } catch (error) {
    return { status: 404, message: error.message };
  }
}

module.exports = { getAllTalkers, getOneTalker };
