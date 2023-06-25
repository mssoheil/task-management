import { createHash } from 'crypto';

export function hashPassword(value: string) {
  const hash = createHash('sha256');
  hash.update(value);
  return hash.digest('hex');
}
