import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string, salt?: string) {
    if (!salt) {
      salt = randomBytes(8).toString('hex');
    }

    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [_, salt] = storedPassword.split('.');
    return storedPassword === await this.toHash(suppliedPassword, salt);
  }
}