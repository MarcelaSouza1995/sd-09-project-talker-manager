const fs = require('fs').promises;
const { getData } = require('../services');

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await getData();
  const talker = { name, age, id: data.length + 1, talk };
  await fs.writeFile('./talker.json', JSON.stringify([...data, talker]));
  return res.status(201).json(talker);
};

module.exports = createTalker;
