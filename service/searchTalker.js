const readFile = require('./readFile');

const HTTP_OK_STATUS = 200;

async function searchTalker(request, response) {
  const { q } = request.query;
  const data = await readFile();
  const foundTalkers = data.filter((talker) => talker.name.includes(q));
  response.status(HTTP_OK_STATUS).json(foundTalkers);
}

module.exports = searchTalker;
