const fs = require('fs');
const rescue = require('express-rescue');

const getAllTalkers = rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await fs.readFileSync('talker.json', 'utf8');
    const talkerResult = JSON.parse(result).filter((talker) => talker.id === +(id));

    if (talkerResult.length === 0) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerResult[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = getAllTalkers;