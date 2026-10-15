import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";

export class SelectEternalState extends PlayerState {
  private jewelIdx: number;

  constructor(jewelIdx: number) {
    super();
    this.jewelIdx = jewelIdx;
  }

  override selectEternal(eternalIdx: number): void {
    const game = this.game;

    game.getJewel(this.jewelIdx);
    game.eternals[eternalIdx].isCurse = false;
    game.eternals[eternalIdx].useJewel = this.jewelIdx;
    
    if (
      game.eternals.length >= 3 &&
      !game.eternals[0]!.isCurse &&
      !game.eternals[1]!.isCurse &&
      !game.eternals[2]!.isCurse
    ) {
      game.getStar(0);
    }
    if (
      game.eternals.length >= 6 &&
      !game.eternals[3]!.isCurse &&
      !game.eternals[4]!.isCurse &&
      !game.eternals[5]!.isCurse
    ) {
      game.getStar(1);
    }

    this.player.turnEnd();
    game.emitGameData();
    game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個已甦醒的神獸。';
    this.stateData.validEternal = this.game.eternals.map((eternal) => eternal.isCurse);
    return this.stateData;
  }
}