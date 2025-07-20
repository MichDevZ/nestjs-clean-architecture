import { User } from "src/domain/entitites/user.entity";
import { IUserRepository } from "src/domain/repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { EVENT_BUS, USER_REPOSITORY } from "src/shared/constants/tokents";
import { IEventBus } from "../events/event-bus";

@Injectable()
export class UserCreatedHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(EVENT_BUS)
    private eventEmitter: IEventBus,
  ) {
    this.eventEmitter.on('UserCreated', this.handle.bind(this));
  }

  private async handle(user: User): Promise<void> {
    await this.userRepository.update(user);
  }
}