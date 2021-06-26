const readFile = require('./readFile');
const writeFile = require('./writeFile');

const HTTP_OK_STATUS = 200;

async function updateTalker(request, response) {
  const data = await readFile();
  const { id } = request.params;
  const talkerUpdated = { id: +(id), ...request.body };
  const newData = data
    .map((talker) => ((+(talker.id) !== +(id) ? talker : { ...talkerUpdated })));
  writeFile(newData);
  response.status(HTTP_OK_STATUS).json(talkerUpdated);
}

module.exports = updateTalker;
