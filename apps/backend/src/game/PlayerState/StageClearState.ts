import { PlayerState } from "./PlayerState";
import { GameBoard, StateData } from "@shared/types";

export class StageClearState extends PlayerState {
  override getGameData(): GameBoard {
    return this.game.getGameData(this.player.id);
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '關卡通關!';
    this.stateData.button.show = true;
    this.stateData.button.string = '離開遊戲'
    return this.stateData;
  }
}