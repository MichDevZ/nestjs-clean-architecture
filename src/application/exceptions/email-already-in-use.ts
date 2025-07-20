

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super(`The email is already in use`);
    this.name = 'EmailAlreadyInUseError';
  }
}