import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";

export abstract class StarCardAbility extends AbilityCard {
  override launchAbility(player: Player): void {
    player.game.playStarAbility(this);
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