import { CreateUserUseCase } from './create-user.usecase';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IPasswordService } from '../services/interfaces/password.service';
import { IEventBus } from '../events/event-bus';
import { EmailAlreadyInUseError } from '../exceptions/email-already-in-use';
import { User } from 'src/domain/entitites/user.entity';
import { InvalidParameterError } from '../exceptions/invalid-parameter';
import { validateUserInput } from '../validators/user-input-validator';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordService: jest.Mocked<IPasswordService>;
  let mockEventBus: jest.Mocked<IEventBus>;

  beforeEach(() => {
    mockUserRepository = {
      isEmailInUse: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    mockPasswordService = {
      hashPassword: jest.fn(),
      generatePassword: jest.fn(),
    } as jest.Mocked<IPasswordService>;

    mockEventBus = {
      emit: jest.fn(),
      on: jest.fn(),
    } as jest.Mocked<IEventBus>;

    useCase = new CreateUserUseCase(
      mockUserRepository,
      mockPasswordService,
      mockEventBus,
    );
  });

  it('should throw EmailAlreadyInUseError if email is already in use', async () => {
    mockUserRepository.isEmailInUse.mockResolvedValue(true);

    await expect(
      useCase.execute('Michael', 'Michael@gmail.com', 'secret'),
    ).rejects.toThrow(EmailAlreadyInUseError);
  });

  it('should create user with hashed password if provided', async () => {
    mockUserRepository.isEmailInUse.mockResolvedValue(false);
    mockPasswordService.hashPassword.mockResolvedValue('hashed123');

    const result = await useCase.execute('Michael', 'Michael@gmail.com', 'secret');

    expect(mockPasswordService.hashPassword).toHaveBeenCalledWith('secret');
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
    expect(result.password).toBe('hashed123');
    expect(mockEventBus.emit).not.toHaveBeenCalled(); 
  });

  it('should create user without password and emit UserCreated event', async () => {
    mockUserRepository.isEmailInUse.mockResolvedValue(false);

    const result = await useCase.execute('Michael', 'Michael@gmail.com');

    expect(mockPasswordService.hashPassword).not.toHaveBeenCalled();
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(result).toBeInstanceOf(User);
    expect(result.password).toBeUndefined();
    expect(mockEventBus.emit).toHaveBeenCalledWith('UserCreated', expect.any(User));
  });

    it('should throw InvalidParameterError if email is invalid', async () => {
    await expect(
        useCase.execute('michael', 'michael', '1233456')
    ).rejects.toThrow(InvalidParameterError);
    });
  
    it('should throw InvalidParameterError if username is invalid', async () => {
    await expect(
        useCase.execute('', 'michael@gmail.com', '123456')
    ).rejects.toThrow(InvalidParameterError);
    });

    it('should throw InvalidParameterError if password is invalid', async () => {
    await expect(
        useCase.execute('michael', 'michael@gmail.com', '123')
    ).rejects.toThrow(InvalidParameterError);
    });

    it('should not throw if all inputs are valid', () => {
    expect(() => validateUserInput('Michael', 'email@example.com', '123456')).not.toThrow();
    });
  
});