const fs = require('fs').promises;

function getAllTalkers() {
  const talkers = fs.readFile('./talker.json', 'utf-8')
    .then((fileTalker) => JSON.parse(fileTalker))
    .catch((_Error) => []);
    return talkers;
}
// O status faz onde chama a função no middleware
function getTalkerById(id) {
  const talker = getAllTalkers()
    .then((fileTalkerJSON) => {
      const result = fileTalkerJSON.find((talkerVerify) => talkerVerify.id === parseInt(id, 10));
      if (!result) {
        return ({ message: 'Pessoa palestrante não encontrada' });
      }
      return result;
    })
    .catch((_) => ({ message: 'Pessoa palestrante não encontrada' }));
    return talker;
}

module.exports = { getAllTalkers, getTalkerById };