import { readFile } from 'fs/promises';

export const parseJsonFile = async <T>(path: string): Promise<T> =>
  JSON.parse(
    await readFile(path, {
      encoding: 'utf8',
    }),
  );
