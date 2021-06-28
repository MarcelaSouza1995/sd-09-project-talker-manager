const fs = require('fs').promises;
const fetchTalkerApi = require('../service/fetchTalkerApi');

const editTalkerMiddleware = async (req, res, _next) => {
  const talkers = await fetchTalkerApi();
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const newTalkers = talkers.map((element) => {
    if (element.id === Number(id)) {
      return {
        name,
        age,
        id: Number(id),
        talk,
      };
    }
    return element;
  });
  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
  const editedTalker = newTalkers.find((element) => element.id === Number(id));
  res.status(200).json(editedTalker);
};

module.exports = editTalkerMiddleware;