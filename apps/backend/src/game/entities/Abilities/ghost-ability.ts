import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { DisscussIdleState } from "../../PlayerState/DiscussIdleState";
import { DisscussState } from "../../PlayerState/DiscussState";

export class GhostAbility extends AbilityCard {
  constructor() {
    super(CardGroup.GHOST);
  }

  override play(player: Player): void {
    for (let gamePlayer of player.game.players) {
      gamePlayer.changeState(new DisscussIdleState());
    }
    player.changeState(new DisscussState());
  }
}