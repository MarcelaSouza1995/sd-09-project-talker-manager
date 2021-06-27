class FileError extends Error {
  constructor(fileName) {
    super();
    this.name = 'FileNameError';
    this.message = `Não foi possível ler o arquivo ${fileName}.`;
  }
}

module.exports = FileError;
