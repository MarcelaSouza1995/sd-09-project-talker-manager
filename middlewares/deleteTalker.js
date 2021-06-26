const fs = require('fs').promises;
const { getData, message } = require('../services');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const data = await getData();
  const arr = data.filter((e) => e.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(arr));
  return res.status(200).json({ message: message.deleteTalker });
};

module.exports = deleteTalker;
