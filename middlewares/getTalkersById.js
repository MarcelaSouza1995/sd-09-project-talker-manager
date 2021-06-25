const rescue = require('express-rescue');
const { getTalkManagers } = require('../utils/fs-utils');

module.exports = rescue(async (req, res) => {
    const talkers = await getTalkManagers();
    
    const talker = talkers.find(({ id }) => id === Number(req.params.id));

    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
});

/* async function debugTalkers() {
    const res = await getTalkManagers();
    return res.find(({ id }) => id === 1);
}
debugTalkers().then((value) => console.log(value)); */