import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { SelectRiverCardState } from "../../PlayerState/SelectRiverCard";

export class KrakenAbility extends AbilityCard {
  constructor() {
    super(CardGroup.KRAKEN);
  }

  override play(player: Player): void {
    if (player.game.river.cards.length == 0) {
      player.turnEnd();
    } else {
      player.changeState(new SelectRiverCardState());
    }
  }
}