import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { DrawPlayerDeckState } from "../../PlayerState/DrawPlayerDeckState";

export class MummyAbility extends AbilityCard {
  constructor() {
    super(CardGroup.MUMMY);
  }

  override launchAbility(player: Player): void {
    player.changeState(new DrawPlayerDeckState());
  }
}