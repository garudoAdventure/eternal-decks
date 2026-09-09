import { Module } from "@nestjs/common";
import { RoomGateway } from "./room.gateway";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [GameModule, AuthModule],
	controllers: [RoomController],
	providers: [RoomGateway, RoomService],
})
export class RoomModule {}