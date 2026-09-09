import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  @Post('regist')
  issueGuestToken(@Body() data: { name: string }) {
    const playerId = randomUUID();
    const token = this.jwtService.sign({ id: playerId, name: data.name });
    return { token };
  }
}