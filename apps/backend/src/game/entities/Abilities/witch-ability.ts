import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { Eternal } from "../Eternal";
import { SelectJewelState } from "../../PlayerState/SelectJewelState";

export class WitchAbility extends AbilityCard {
  constructor() {
    super(CardGroup.WITCH);
  }

  override play(player: Player): void {
    if (player.game.eternals.filter((eternal: Eternal) => eternal.isCurse).length == 0) {
      player.turnEnd();
    } else {
      player.changeState(new SelectJewelState());
    }
  }
}