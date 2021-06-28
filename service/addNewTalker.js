const readFile = require('./readFile');
const writeFile = require('./writeFile');

const HTTP_CREATED_STATUS = 201;

async function addNewTalker(request, response) {
  const data = await readFile();
  const talker = request.body;
  talker.id = data.length + 1;
  const newData = [...data, talker];
  await writeFile(newData);
  return response.status(HTTP_CREATED_STATUS).json(talker);
}

module.exports = addNewTalker;
