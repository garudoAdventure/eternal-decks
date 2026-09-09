import { PlayerState } from "./PlayerState";
import { Card } from "../entities/Card";
import { StateData } from "@shared/types";

export class SelectFieldCardState extends PlayerState {
  private minotaurCard: Card;

  constructor(card: Card) {
    super();
    this.minotaurCard = card;
  }

  override selectFieldCard(fieldIdx: number, cardIdx: number): void {
    let card: Card = this.game.fields[fieldIdx]!.cards[cardIdx]!;
    this.player.hand.push(card);
    this.game.fields[fieldIdx]!.cards[cardIdx]! = this.minotaurCard;
    this.game.fields[fieldIdx]!.reCaclCurrentVal();
    
    let idx = 0;
    for (let card of this.player.hand) {
      if (card == this.minotaurCard) {
        this.player.hand.splice(idx, 1);
        break;
      }
      idx++;
    }
    
    this.player.turnEnd();
    this.game.emitGameData();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一個場上的牌與能力卡交換。'
    this.stateData.validFieldCard = true;
    return this.stateData;
  }
}