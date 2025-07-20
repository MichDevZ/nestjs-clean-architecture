import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from 'src/application/services/interfaces/password.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PasswordGeneratorService implements IPasswordService {
  generatePassword(length: number = 10): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}