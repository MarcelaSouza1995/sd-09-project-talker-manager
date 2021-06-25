const login = (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    res.status(200).json({ deuBom: true });
};

module.exports = login;
