import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";
import { SelectEternalState } from "./SelectEternalState";

export class SelectJewelState extends PlayerState {
  override selectJewel(jewelIdx: number): void {
    this.player.changeState(new SelectEternalState(jewelIdx));
    this.game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個寶石來生成。';
    this.stateData.validJewel = this.game.Jewels.map((isGen) => !isGen);
    this.stateData.validJewel[5] = false;
    return this.stateData;
  }
}