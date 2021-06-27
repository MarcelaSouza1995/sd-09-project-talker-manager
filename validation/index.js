module.exports = {
  verifyEmail: (email) => {
    const emailRegex = /^([a-zA-Z0-9_-]+)@mail\.com$/gm;
    return emailRegex.test(email);
  },
  verifyPassword: (password) => {
    const passwordRegex = /^\d{6,8}$/gm;
    return passwordRegex.test(password);
  },
  verifyToken(token) {
    const tokenRegex = /^(\d|\w){16}$/gm;
    return tokenRegex.test(token);
  },
};