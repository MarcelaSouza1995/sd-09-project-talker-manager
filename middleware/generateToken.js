function randomToken() {
  const token = Math.random().toString(36).substr(2);
  return token + token;
}

function generateToken(_req, res) {
  const token = randomToken().slice(0, 16);
  res.status(200).json({ token });
}

module.exports = generateToken;
