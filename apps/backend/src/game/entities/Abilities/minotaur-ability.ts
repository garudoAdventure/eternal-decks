import { CardGroup } from "@shared/types";
import { AbilityCard } from "./ability-card";
import { Player } from "../Player";
import { SelectFieldCardState } from "../../PlayerState/SelectFieldCardState";

export class MinotaurAbility extends AbilityCard {
  constructor() {
    super(CardGroup.MINOTAUR);
  }

  override launchAbility(player: Player): void {
    player.changeState(new SelectFieldCardState(this));
  }
}