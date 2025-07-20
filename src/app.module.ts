import { Module } from '@nestjs/common';
import { UserModule } from './presentation/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"})],
  controllers: [],
  providers: [],
})
export class AppModule {}
