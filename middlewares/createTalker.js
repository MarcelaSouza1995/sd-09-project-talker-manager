const fs = require('fs').promises;
const rescue = require('express-rescue');

const createTalker = rescue(async (req, res) => {
  try {
    const result = await fs.readFile('talker.json', 'utf8');
    const talkers = JSON.parse(result);
    const { name, age, talk } = req.body;
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };
    
    talkers.push(newTalker);
    
    await fs.writeFile('talker.json', JSON.stringify(talkers));
    return res.status(201).json(newTalker);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = createTalker;