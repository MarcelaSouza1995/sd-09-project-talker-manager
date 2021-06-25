const fs = require('fs/promises');

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json');
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    const errorObject = { code: 500, errorMsg: error.message };
    return errorObject;
  }
}

module.exports = { getAllTalkers };