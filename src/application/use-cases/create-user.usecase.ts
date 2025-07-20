import { User } from "src/domain/entitites/user.entity";
import { IUserRepository } from "src/domain/repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { EVENT_BUS, PASSWORD_SERVICE, USER_REPOSITORY } from "src/shared/constants/tokents";
import { IPasswordService } from "../services/interfaces/password.service";
import { EmailAlreadyInUseError } from "../exceptions/email-already-in-use";
import { IEventBus } from "../events/event-bus";
import { validateUserInput } from "../validators/user-input-validator";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(PASSWORD_SERVICE)
    private passwordGenerator: IPasswordService,
    @Inject(EVENT_BUS)
    private eventEmitter: IEventBus,
  ) {}

  async execute(username: string, email: string, password?: string): Promise<User> {

    validateUserInput(username, email, password)
    
    const isEmailInUse = await this.userRepository.isEmailInUse(email);

    if (isEmailInUse) {
      throw new EmailAlreadyInUseError();
    }

    const finalPassword = password
                                  ? await this.passwordGenerator.hashPassword(password)
                                  : undefined;
    const user = new User(
      this.generateId(),
      username,
      email,
      finalPassword,
    );

    await this.userRepository.create(user);

    
    if (!finalPassword) {
      await this.eventEmitter.emit('UserCreated', user);
    }

    return user;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}