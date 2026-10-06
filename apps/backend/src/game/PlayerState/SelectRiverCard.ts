import { PlayerState } from "./PlayerState";
import { Card } from "../entities/Card";
import { StateData } from "@shared/types";

export class SelectRiverCardState extends PlayerState {
  private getCardChance = 2;

  override selectCard(cardIdx: number): void {
    let card: Card = this.game.river.cards[cardIdx]!;
    this.player.hand.push(card);
    this.game.river.cards.splice(cardIdx, 1);

    this.game.movedItemId.push('card-' + card.id);
    
    this.getCardChance--;
    if (this.getCardChance == 0 || this.game.river.cards.length == 0) {
      this.player.turnEnd();
    }
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override confirmAction(): void {
    this.player.turnEnd();
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一張河流區的牌拿回手中。（還可拿' + this.getCardChance + '張）';
    this.stateData.button = {
      show: true,
      string: '不拿了'
    };
    this.stateData.validRiverCard = true;
    return this.stateData;
  }
}