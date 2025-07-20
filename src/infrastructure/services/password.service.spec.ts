
import * as bcrypt from 'bcrypt';
import { PasswordGeneratorService } from './password.service';

describe('PasswordGeneratorService', () => {
  let service: PasswordGeneratorService;

  beforeEach(() => {
    service = new PasswordGeneratorService();
  });

  describe('generatePassword', () => {
    it('should generate a password of given length', () => {
      const password = service.generatePassword(12);
      expect(password).toHaveLength(12);
    });

    it('should generate different passwords on each call', () => {
      const password1 = service.generatePassword(10);
      const password2 = service.generatePassword(10);
      expect(password1).not.toBe(password2);
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password that is different from input', async () => {
      const raw = 'my-secret';
      const hashed = await service.hashPassword(raw);
      expect(hashed).not.toBe(raw);
    });

    it('should return a valid bcrypt hash that matches the original', async () => {
      const raw = 'another-secret';
      const hashed = await service.hashPassword(raw);
      const isMatch = await bcrypt.compare(raw, hashed);
      expect(isMatch).toBe(true);
    });
  });
});