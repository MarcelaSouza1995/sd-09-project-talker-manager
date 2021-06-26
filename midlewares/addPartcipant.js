const fs = require('fs');

const addPartcipant = (req, res) => {
  const { name, age, talk } = req.body;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const newParticipant = {
    name,
    age,
    talk,
    id: data.length + 1,
  };
  data.push(newParticipant);
  fs.writeFileSync('talker.json', JSON.stringify(data));
  res.status(201).json(newParticipant);
};

module.exports = addPartcipant;