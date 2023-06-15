import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let dirname = '';

const filename = fileURLToPath(import.meta.url);
dirname = path.dirname(filename);

export function json(url: string, parse?: boolean) {
  const _path = path.join(dirname, `../${url}`);
  const jsonData = fs.readFileSync(_path, { encoding: 'utf-8' });
  if (parse) return JSON.parse(jsonData);
  return jsonData;
}
