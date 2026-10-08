import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";
import { SelectCardState } from "./SelectCardState";

export class SelectPlayerState extends PlayerState {
  override selectPlayer(playerId: string): void {
    this.player.changeState(new SelectCardState(playerId));
    this.game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一位玩家。';
    this.stateData.validPlayer = [false, true, true, true];
    return this.stateData;
  }
}