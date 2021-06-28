const fs = require('fs');

const addPartcipant = (req, res) => {
  console.log('teste');

  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const filterParticipants = data.filter((e) => e.id !== +(id));
  const editedParticipant = {
    name,
    age,
    talk,
    id: (+id),
  };
  const editedList = [...filterParticipants, editedParticipant];
  fs.writeFileSync('./talker.json', JSON.stringify(editedList));
  res.status(200).json(editedParticipant);
};

module.exports = addPartcipant;