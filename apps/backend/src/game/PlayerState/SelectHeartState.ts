import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";

export class SelectHeartState extends PlayerState {
  override selectHeart(heartIdx: number): void {
    this.game.usedHeart[heartIdx] = false;
    this.player.turnEnd();
    this.game.emitGameData();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個已使用的愛心。'
    this.stateData.validHeart = this.game.usedHeart.map((isUsed) => isUsed);
    return this.stateData;
  }
}