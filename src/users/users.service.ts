import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from '.prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const user = await this.prisma.createUser({
      email,
      password,
    });

    return user;
  }

  async loginUser(loginDto: LoginDto): Promise<{ token: string; user: User }> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const user = await this.prisma.findUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return { token, user };
  }
}
