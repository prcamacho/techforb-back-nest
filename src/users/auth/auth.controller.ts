import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('check-token')
  async checkToken(@Headers('authorization') authHeader: string) {
    try {
      if (!authHeader) {
        throw new HttpException(
          'No se proporcionó el token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = authHeader.split(' ')[1];

      if (!process.env.JWT_SECRET_KEY) {
        throw new Error('La llave secreta de JWT no está definida');
      }

      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (!decoded || typeof decoded !== 'object') {
        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.prisma.findUserById(decoded.id);

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Ocurrió un error al verificar el token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
