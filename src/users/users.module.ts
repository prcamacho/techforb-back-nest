import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule,AuthModule],
  controllers: [UsersController,AuthController],
  providers: [UsersService],
  exports: [AuthController]
})
export class UsersModule {}
