import { pbkdf2 } from 'crypto';

export function hashPassword(
  password: string,
  { salt = process.env.PASSWORD_SALT || 'secret666666' } = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      salt,
      1,
      64,
      'sha512',
      (error: any, derivedKey: { toString: (arg0: string) => any }) => {
        if (error) return reject(error);

        const digest = derivedKey.toString('hex');

        return resolve(digest);
      },
    );
  });
}

export async function comparePassword(password, hashedPassword) {
  const hashed = await hashPassword(password);
  return hashed === hashedPassword;
}
