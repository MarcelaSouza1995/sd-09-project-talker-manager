const rescue = require('express-rescue');
const fs = require('fs').promises;
const path = require('path');
// const talker = require('../../talker.json');

const pathData = path.resolve(__dirname, '../../', 'talker.json');

async function readFiles() {
  const result = await fs.readFile(pathData, 'utf-8');
  const data = JSON.parse(result);
  return data;
}

async function talkerList() {
  const data = await readFiles();
  return data;
}

const endpointTalker = rescue(async (_req, res, _next) => {
  const result = await talkerList();
  res.status(200).json(result);
});

module.exports = { 
  endpointTalker,
};