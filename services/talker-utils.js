import { readFile } from 'fs/promises';

export default async () => {
  const fileContent = await readFile('./talker.json');

  return JSON.parse(fileContent);
};
