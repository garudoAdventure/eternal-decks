import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from '../room/room.module';
import { AuthModule } from '../auth/auth.module';
import { GameModule } from '../game/game.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RoomModule, AuthModule, GameModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
