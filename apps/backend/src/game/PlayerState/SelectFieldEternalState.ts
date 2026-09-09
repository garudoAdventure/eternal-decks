import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";

export class SelectFieldEternalState extends PlayerState {
  private fieledIdx: number;

  constructor(fieldIdx: number) {
    super();
    this.fieledIdx = fieldIdx;
  }
  
  override selectFieldEternal(eternalIdx: number): void {
    let eternal = this.game.fields[this.fieledIdx]!.releaseEternal(eternalIdx);
    eternal.deck.shuffle();
    this.player.deck.addDeck(eternal.deck);

    this.game.fields[this.fieledIdx]!.emptyField();

    this.player.turnEnd();
    this.game.emitGameData();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個神獸使其甦醒。';

    let validFieldEternal: boolean[] = [false, false, false];
    validFieldEternal[this.fieledIdx] = true;

    this.stateData.validFieldEternal = validFieldEternal;
    return this.stateData;
  }
}