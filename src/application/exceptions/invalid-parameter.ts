
export class InvalidParameterError extends Error {
  constructor(message?: string) {
    super(message || 'Invalid parameter');
    this.name = 'InvalidParameterError';
  }
}