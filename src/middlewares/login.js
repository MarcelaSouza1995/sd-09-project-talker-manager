const rescue = require('express-rescue');
// const fs = require('fs').promises;
// const path = require('path');

// async function readFile() {
//   const result = await fs.writeFile(pathData, 'utf-8');
//   const data = JSON.parse(result);
//   return data;
// }

// async function talkerList() {
//   const data = await readFiles();
//   return data;
// }

const endpointLogin = rescue(async (req, res, _next) => {
  const result = await req.body;
  console.log(req.body);
  // const result = await talkerList();
  return res.status(200).json((result));
});

module.exports = {
  endpointLogin,
};