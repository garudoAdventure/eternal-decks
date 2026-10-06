import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";

export abstract class StarCardAbility extends AbilityCard {
  override play(player: Player): void {
    player.game.starCard.push(this);
    if (player.game.starCard.length == 3) {
      player.game.getStar(4);
    }
    player.turnEnd();
  }
}

export class PhoenixAbility extends StarCardAbility {
  constructor() {
    super(CardGroup.PHOENIX);
  }
}

export class MermaidAbility extends StarCardAbility {
  constructor() {
    super(CardGroup.MERMAID);
  }
}

export class KingAbility extends StarCardAbility {
  constructor() {
    super(CardGroup.KING);
  }
}

export class FairyAbility extends StarCardAbility {
  constructor() {
    super(CardGroup.FAIRY);
  }
}