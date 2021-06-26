const fs = require('fs').promises;
const { getData } = require('../services');

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const data = await getData();
  const arr = data.map((e) => (e.id === +id ? { name, age, id: +id, talk } : e));
  await fs.writeFile('./talker.json', JSON.stringify(arr));
  return res.status(200).json({ name, age, id: +id, talk });
};

module.exports = editTalker;
