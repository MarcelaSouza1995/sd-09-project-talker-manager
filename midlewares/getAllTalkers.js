const fs = require('fs');
const rescue = require('express-rescue');

const getAllTalkers = rescue(async (req, res) => {
  try {
    const result = await fs.readFileSync('talker.json', 'utf8');
    if (result.length === 0) res.status(200).json([]);
    return res.status(200).json(JSON.parse(result));
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = getAllTalkers;