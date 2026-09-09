import { PlayerState } from "./PlayerState";
import { Camp } from "../entities/Rule";
import { StateData } from "@shared/types";

export class SelectFieldState extends PlayerState {
  override selectField(fieldIdx: number): void {
    this.game.fields[fieldIdx]!.setCard(new Camp().card);
    this.game.fields[fieldIdx]!.isTransToCamp = true;
    this.game.fields[fieldIdx]!.handleFieldComplete(this.player, fieldIdx);
    this.player.turnEnd();
    this.game.emitGameData();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個區塊放置獎勵帳篷卡。'
    this.stateData.validField = [true, true, true, false];
    return this.stateData;
  }
}