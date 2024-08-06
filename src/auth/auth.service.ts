import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/users/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly prisma: PrismaService ) {}

  async validateUser(userId: number) {
    return this.prisma.findUserById(userId);
  }
}
