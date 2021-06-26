const fs = require('fs/promises');

const deleteTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));
  const updatedTalkers = talkers.filter((talker) => talker.id !== +id);

  await fs.writeFile('./talker.json', JSON.stringify(updatedTalkers));
  
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalkerById;
