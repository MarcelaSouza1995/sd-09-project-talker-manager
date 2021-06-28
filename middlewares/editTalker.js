const fs = require('fs').promises;

const editTalker = async (request, response) => {
  const id = Number(request.params.id);
  const { body } = request;

  await fs.readFile('./talker.json')
  .then((files) => {
    const jsonArray = JSON.parse(files);
    const findArray = jsonArray.filter((item) => item.id !== id);
    
    findArray.push({ id, ...body });
    fs.writeFile('./talker.json', JSON.stringify(findArray))
    .then(() => response.status(200).json({ id, ...body }));
  });
};

module.exports = editTalker;