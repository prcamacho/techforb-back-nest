import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check-token')
  @UseGuards(JwtAuthGuard)
  async checkToken(@Req() req) {
    return req.user;
  }
}