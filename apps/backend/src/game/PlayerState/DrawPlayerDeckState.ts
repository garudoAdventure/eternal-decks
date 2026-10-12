import { PlayerState } from "./PlayerState";
import { StateData } from "@shared/types";
import { Player } from "../entities/Player";

export class DrawPlayerDeckState extends PlayerState {
  private getCardChance = 3;

  override selectPlayer(playerId: string): void {
    const selectedPlayer = this.game.players.find((p: Player) => p.id == playerId);
    const drawCard = selectedPlayer.deck.draw(1)[0];
    this.player.hand.push(drawCard);
    
    this.getCardChance--;
    if (this.getCardChance === 0 || this.game.players.filter(p => p.deck.cardNum > 0).length === 0) {
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
    this.stateData.message = '請抽取一位玩家的牌庫中的牌。（還可抽' + this.getCardChance + '張）';
    this.stateData.button = {
      show: true,
      string: '不抽了'
    };
    this.game.getPlayersData(this.player.id).forEach((player, idx) => {
      this.stateData.validPlayer[idx] = player.deckNum > 0;
    });
    return this.stateData;
  }
}