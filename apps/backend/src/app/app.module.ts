import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from '../room/room.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RoomModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
