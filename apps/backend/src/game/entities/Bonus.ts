import { Player } from "./Player";
import { Camp } from "./Rule";

export interface Bonus {
  get(player: Player): void;
}

export class CampBonus implements Bonus {
  get(player: Player) {
    player.hand.push(new Camp().card);
  }
}

export class HeartBonus implements Bonus {
  get(player: Player) {
    player.game.usedHeart = [false, false, false];
    player.turnEnd();
  }
}

export class StarBonus implements Bonus {
  get(player: Player) {
    player.game.getStar[5] = true;
    player.turnEnd();
  }
}