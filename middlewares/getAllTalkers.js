const fs = require('fs').promises;
const rescue = require('express-rescue');

const file = 'talker.json';
  
const getAllTalkers = rescue(async (_req, res, next) => {
  try {
    const response = await fs.readFile(file, 'utf8');
   if (response.length > 0) {
     return res.status(200).json(JSON.parse(response));
   }
   return res.status(200).json([]);
  } catch (error) {
    return next({ message: error.message });
  }
});

module.exports = getAllTalkers;
