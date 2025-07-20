import { User } from './user.entity';

describe('User Entity', () => {
  const validId = 'abc123';
  const validUsername = 'Michael';
  const validEmail = 'michael@gmail.com';
  const validPassword = 'securePassword';

  it('should create a user with valid inputs', () => {
    const user = new User(validId, validUsername, validEmail, validPassword);

    expect(user.id).toBe(validId);
    expect(user.username).toBe(validUsername);
    expect(user.email).toBe(validEmail);
    expect(user.password).toBe(validPassword);
  });

  it('should throw an error if id is missing', () => {
    expect(() => new User('', validUsername, validEmail, validPassword)).toThrow('Missing ID');
  });

  it('should throw an error if username is missing', () => {
    expect(() => new User(validId, '', validEmail, validPassword)).toThrow('Missing username');
  });

  it('should throw an error if email is missing', () => {
    expect(() => new User(validId, validUsername, '', validPassword)).toThrow('Not valid email');
  });

  it('should throw an error if email is invalid', () => {
    expect(() => new User(validId, validUsername, 'invalid-email', validPassword)).toThrow('Not valid email');
  });

  it('should allow creating a user without a password', () => {
    const user = new User(validId, validUsername, validEmail);
    expect(user.password).toBeUndefined();
  });
});