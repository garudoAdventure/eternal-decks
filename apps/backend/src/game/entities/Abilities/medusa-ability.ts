import { CardGroup, CardType } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";

export class MedusaAbility extends AbilityCard {
  constructor() {
    super(CardGroup.MEDUSA);
  }

  override play(player: Player): void {
    let idx = 0;
    for (let card of player.game.discard) {
      if (card.type == CardType.RARE) {
        player.game.river.rareCards.push(card);
        player.game.discard.splice(idx, 1);
        break;
      }
      idx++;
    }
    player.turnEnd();
  }
}