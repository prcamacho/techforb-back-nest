import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from 'jsonwebtoken';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [], 
  exports: [], 
})
export class AuthModule {}
