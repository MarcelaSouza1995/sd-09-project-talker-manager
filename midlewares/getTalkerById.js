const fs = require('fs');
const rescue = require('express-rescue');

const getAllTalkers = rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await fs.readFileSync('talker.json', 'utf8');
    if (result.length === 0) res.status(200).json([]);
    const talkerResult = JSON.parse(result).filter((talker) => talker.id === +(id));
    return res.status(200).json(talkerResult[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = getAllTalkers;