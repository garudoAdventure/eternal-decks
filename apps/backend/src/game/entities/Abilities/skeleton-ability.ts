import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { SelectHeartState } from "../../PlayerState/SelectHeartState";

export class SkeletonAbility extends AbilityCard {
  constructor() {
    super(CardGroup.SKELETON);
  }

  override play(player: Player): void {
    if (player.game.usedHeart.filter((isUsed) => isUsed).length == 0) {
      player.turnEnd();
    } else {
      player.changeState(new SelectHeartState());
    }
  }
}