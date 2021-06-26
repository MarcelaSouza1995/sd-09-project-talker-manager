const { getData } = require('../services');

const searchTalker = async (req, res) => {
  const data = await getData();
  const arr = data.filter((e) => e.name.includes(req.query.q));
  return res.status(200).json(arr);
};

module.exports = searchTalker;
