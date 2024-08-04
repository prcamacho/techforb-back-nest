import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthController } from './users/auth/auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
