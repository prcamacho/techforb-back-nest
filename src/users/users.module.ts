import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController,AuthController],
  providers: [UsersService,AuthController],
  exports: [AuthController]
})
export class UsersModule {}
