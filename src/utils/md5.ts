import { createHash } from 'node:crypto';

export function generateMd5Hash(value: string) {
  return createHash('md5').update(value).digest('hex');
}
