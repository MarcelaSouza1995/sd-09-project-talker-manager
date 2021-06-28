const readFile = require('./readFile');
const writeFile = require('./writeFile');

const HTTP_OK_STATUS = 200;
const message = 'Pessoa palestrante deletada com sucesso';

async function deleteTalker(request, response) {
  const { id } = request.params;
  const data = await readFile();
  const deletedTalker = data.filter((talker) => +(talker.id) !== +(id));
  writeFile(deletedTalker);
  return response.status(HTTP_OK_STATUS).json({ message });
}

module.exports = deleteTalker;
