const fs = require('fs').promises;

function idSearch(request, response) {
  fs.readFile('./talker.json')
  .then((files) => {
  const { id } = request.params;
  const jsonArray = JSON.parse(files);
  const findArray = jsonArray.find((item) => item.id === Number(id));
  if (findArray) {
    return response.status(200).json(findArray);
  } 
  response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });
}

module.exports = idSearch;