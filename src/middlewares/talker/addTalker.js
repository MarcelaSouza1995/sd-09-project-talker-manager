const fs = require('fs');
const { getFile } = require('../../services');

const addTalker = async (req, res) => {
  const file = 'talker.json';
  const data = await getFile(file);
  console.log('addTalker ################################### log: ', data);

  const newTalker = {
    id: data.length + 1,
    ...req.body,
  };

  console.log('addTalker ################################### log: newTalker', newTalker);
  data.push(newTalker);
  await fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('addTalker log: ', data);
  return res.status(201).json(newTalker);
};

module.exports = addTalker;
