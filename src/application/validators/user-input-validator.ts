import { InvalidParameterError } from "../exceptions/invalid-parameter";

export function validateUserInput(username: string, email: string, password?: string) {
  if (!username || username.trim() === '' || !email || email.trim() === '' || !isValidEmail(email) || password  && password.length < 6) {
    throw new InvalidParameterError('Invalid user input');
  }

}

function isValidEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}