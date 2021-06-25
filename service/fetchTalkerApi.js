const fs = require('fs').promises;

const fetchTalkerApi = async () => {
  try {
    const talkers = await fs.readFile('./talker.json');
    return JSON.parse(talkers);
  } catch (error) {
    return { code: 400, message: 'Erro na requisição' };
  }
};

module.exports = fetchTalkerApi;
