import { IdleState, PlayerState } from "./PlayerState";
import { GameBoard, StateData } from "@shared/types";

export class DisscussState extends PlayerState {
  override confirmAction(): void {
    for (let player of this.game.players) {
      if (player != this.player) {
        player.changeState(new IdleState());
      }
    }
    this.player.turnEnd();
    this.game.emitAvailableMove();
  }

  override getGameData(): GameBoard {
    return this.game.getGameData(this.player.id, false);
  }

  override getAvailableMove(): StateData {
    this.stateData.message = '討論結束後，按下結束回合換下一位玩家。';
    this.stateData.button = {
      show: true,
      string: '結束回合'
    };
    return this.stateData;
  }
}