const readFile = require('./readFile');
const writeFile = require('./writeFile');

const message = 'Pessoa palestrante deletada com sucesso';

async function deleteTalker(request, response) {
  const { id } = request.params;
  const data = await readFile();
  const deletedTalker = data.filter((talker) => +(talker.id) !== +(id));
  writeFile(deletedTalker);
  response.status(200).json({ message });
}

module.exports = deleteTalker;
