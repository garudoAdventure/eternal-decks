import { PlayerState } from "./PlayerState";
import { GameBoard, StateData } from "@shared/types";

export class DisscussIdleState extends PlayerState {
  override getGameData(): GameBoard {
    return this.game.getGameData(this.player.id, false);
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '討論階段，等待回合玩家結束回合。';
    return this.stateData;
  }
}