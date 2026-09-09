import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ETERNAL_DECKS',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}