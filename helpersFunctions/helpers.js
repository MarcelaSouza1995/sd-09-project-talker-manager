const fs = require('fs');

const readTalkerFile = (file) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
  return promise;
};

module.exports = { readTalkerFile };
