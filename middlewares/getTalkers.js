const rescue = require('express-rescue');
const { getTalkManagers } = require('../utils/fs-utils');

module.exports = rescue(async (_req, res) => {
    const talkers = await getTalkManagers();
    return res.status(200).json(talkers);
});
