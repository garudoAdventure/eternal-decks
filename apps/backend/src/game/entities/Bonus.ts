import { Player } from "./Player";
import { Camp } from "./Rule";

export interface Bonus {
  get(player: Player): void;
}

export class CampBonus implements Bonus {
  get(player: Player) {
    const campCard = player.game.campBonusCard;
    player.game.campBonusCard = null;
    player.hand.push(campCard);
    player.game.movedItemId.push('card-' + campCard.id);
  }
}

export class HeartBonus implements Bonus {
  get(player: Player) {
    player.game.resetHeart();
    player.turnEnd();
  }
}

export class StarBonus implements Bonus {
  get(player: Player) {
    player.game.getStar(5);
    player.turnEnd();
  }
}