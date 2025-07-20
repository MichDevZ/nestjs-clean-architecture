import { UserCreatedHandler } from './user-created.handler';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IEventBus } from '../events/event-bus';
import { User } from 'src/domain/entitites/user.entity';

describe('UserCreatedHandler', () => {
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockEventBus: jest.Mocked<IEventBus>;

  beforeEach(() => {
    mockUserRepository = {
      update: jest.fn(),
      create: jest.fn(),
      isEmailInUse: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    mockEventBus = {
      emit: jest.fn(),
      on: jest.fn(), 
    } as jest.Mocked<IEventBus>;

    new UserCreatedHandler(mockUserRepository, mockEventBus);
    
  });

  it('should register to the UserCreated event on construction', () => {

    expect(mockEventBus.on).toHaveBeenCalledWith(
      'UserCreated',
      expect.any(Function),
    );
  });

  it('should call userRepository.update when the event is emitted', async () => {
    const registeredCallback = mockEventBus.on.mock.calls[0][1];

    const user = new User('1', 'Michael', 'Michael@gmail.com');
    await registeredCallback(user);

    expect(mockUserRepository.update).toHaveBeenCalledWith(user);
  });
});