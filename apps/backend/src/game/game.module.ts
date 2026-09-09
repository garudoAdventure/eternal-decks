import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { GameManagerService } from "./game-manager-service";

@Module({
  providers: [GameGateway, GameManagerService],
  exports: [GameManagerService]
})
export class GameModule {}