const fs = require('fs');

const deletePartcipant = (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const filterParticipants = data.filter((e) => e.id !== +(id));
  fs.writeFileSync('./talker.json', JSON.stringify(filterParticipants));
  return (res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso' }));
};

module.exports = deletePartcipant;