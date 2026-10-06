import { PlayerState } from "./PlayerState";
import { Card } from "../entities/Card";
import { Player } from "../entities/Player";
import { StateData } from "@shared/types";

export class SelectCardState extends PlayerState {
  private playerId: string;

  constructor(playerId: string) {
    super();
    this.playerId = playerId;
  } 

  override selectCard(cardIdx: number): void {
    let card: Card = this.player.playCard(cardIdx);
    this.game.players.find((p: Player) => p.id == this.playerId)!.hand.push(card);
    this.game.movedItemId.push('card-' + card.id);
    this.player.turnEnd();
    this.game.emitGameData();
    this.game.emitAvailableMove();
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '請選擇一張手牌來給指定玩家。';
    return this.stateData;
  }
}