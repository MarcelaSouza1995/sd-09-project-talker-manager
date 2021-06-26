const fs = require('fs').promises;

async function addtalker(req, res) {
  // const { body } = req;
  // const allTalkers = await fs.readFile('talker.json', 'utf8')
  //   .then((file) => JSON.parse(file));
  // console.log(allTalkers);
  // // allTalkers.push(body);

  // // await fs.writeFile('talker.json', JSON.stringify(allTalkers));

  // res.status(201).send(allTalkers);
}

module.exports = addtalker;
