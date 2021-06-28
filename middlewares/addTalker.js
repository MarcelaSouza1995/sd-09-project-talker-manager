const fs = require('fs').promises;

const addNewTalker = async (request, response) => {
    fs.readFile('./talker.json')
    .then((data) => {
      const talkers = JSON.parse(data);
      const newTalker = { ...request.body, id: talkers[talkers.length - 1].id + 1 };
      talkers.push(newTalker);
      fs.writeFile('./talker.json', JSON.stringify(talkers))
        .then(() => {
          response.status(201).json(newTalker);
        });
    });
};

module.exports = addNewTalker;