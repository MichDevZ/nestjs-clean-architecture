export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password?: string,
  ) {
    if (!id) throw new Error('Missing ID');
    if (!username) throw new Error('Missing username');
    if (!email || !this.isValidEmail(email)) throw new Error('Not valid email');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}