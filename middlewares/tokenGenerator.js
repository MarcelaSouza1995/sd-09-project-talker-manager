const { TOKEN } = require('../util');

const tokenGenerator = (req, res, next) => {
  try {
    return res.status(200).json({ token: TOKEN });
  } catch (error) {
    next(error);
  }
};

module.exports = tokenGenerator;