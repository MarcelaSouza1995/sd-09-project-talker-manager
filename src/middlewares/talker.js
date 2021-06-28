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

async function talkerById(id) {
  const result = await readFiles();
  const data = result.find((element) => element.id === Number(id));
  console.log(data);
  return data;
}

const endpointTalker = rescue(async (_req, res, _next) => {
  const result = await talkerList();
  res.status(200).json(result);
});

const endpointTalkerById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await talkerById(id);
  if (!result) {
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(result);
});

module.exports = { 
  endpointTalker,
  endpointTalkerById,
};