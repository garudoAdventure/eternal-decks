import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";

export class MummyAbility extends AbilityCard {
  constructor() {
    super(CardGroup.MUMMY);
  }

  override play(player: Player): void {
  }
}