import { CardGroup, CardType } from "@shared/types";
import { Card } from "../Card";
import { Player } from "../Player";

export abstract class AbilityCard extends Card {
  constructor(group: CardGroup) {
    super(8, group, CardType.ABILITY);
  }

  override rotate(): void {}

  abstract launchAbility(player: Player): void;
}