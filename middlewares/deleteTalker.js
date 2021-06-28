const fs = require('fs').promises;

const deleteTalker = async (request, response) => {
  const id = Number(request.params.id);

  await fs.readFile('./talker.json')
  .then((files) => {
    const jsonArray = JSON.parse(files);
    const findArray = jsonArray.filter((item) => item.id !== id);

    fs.writeFile('./talker.json', JSON.stringify(findArray))
    .then(() => response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }));
  });
};

module.exports = deleteTalker;