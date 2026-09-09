import { GameBoard, StateData } from "@shared/types";
import { Player } from "../entities/Player";
import { Game } from "../entities/Game";

export class PlayerState {
  player!: Player;
  stateData: StateData = {
    message: '',
    button: { show: false, string: '' },
    validField: [false, false, false, false],
    validHeart: [false, false, false],
    validJewel: [false, false, false, false, false, false],
    validEternal: [false, false, false, false, false, false, false, false, false],
    selectedCard: [],
    validFieldEternal: [false, false, false],
    validPlayer: false,
    validRiverCard: false,
    validFieldCard: false
  };

  get game(): Game {
    return this.player.game;
  }

  selectCard(cardIdx: number) {}
  selectFieldCard(fieldIdx: number, cardIdx: number) {}
  useCard(cardIdx: number) {}
  selectField(fieldIdx: number) {}
  selectHeart(heartIdx: number) {}
  selectJewel(jewelIdx: number) {}
  selectEternal(eternalIdx: number) {}
  selectFieldEternal(eternalIdx: number) {}
  selectPlayer(playerId: string) {}
  confirmAction() {}
  rotateCard(cardIdx: number) {
    this.player.hand[cardIdx]!.rotate();
    this.game.emitGameData();
  }
  getGameData(): GameBoard { return this.game.getGameData(this.player.id); }
  getAvailableMove(): StateData { return this.stateData; }
};

export class IdleState extends PlayerState {
}