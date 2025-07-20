

export interface IPasswordService {
  generatePassword(length: number): string;
  hashPassword(password: string): Promise<string>;
}