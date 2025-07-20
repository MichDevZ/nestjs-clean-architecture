import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.usecase';
import { UserRepositoryImpl } from 'src/infrastructure/repositories/user.repository.impl';
import { FirebaseModule } from 'src/infrastructure/database/firebase/firebase.module';
import { PasswordGeneratorService } from 'src/infrastructure/services/password.service';
import { EVENT_BUS, PASSWORD_SERVICE, USER_REPOSITORY } from 'src/shared/constants/tokents';
import { SimpleEventBus } from 'src/infrastructure/events/event-bus';
import { UserCreatedHandler } from 'src/application/event-handlers/user-created.handler';

@Module({
  imports: [FirebaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UserCreatedHandler,
    {
      provide: EVENT_BUS,
      useClass: SimpleEventBus,
    },
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordGeneratorService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}