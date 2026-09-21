import { Color, FieldData, EternalData } from "@shared/types";
import { Rule } from "./Rule";
import { Eternal } from "./Eternal";
import { Card } from "./Card";
import { Bonus } from "./Bonus";
import { Player } from "./Player";
import { SelectFieldEternalState } from "../PlayerState/SelectFieldEternalState";
import { Game } from "./Game";

export interface CardVal {
  number: number;
  color: Color[];
  isRare: boolean;
}

export class Field {
  rule: Rule[];
  cards: Card[] = [];
  eternals: Eternal[];
  bonus: Bonus;
  isTransToCamp: boolean = false;
  isFixedRule: boolean = false;

  private currentCardVal: CardVal = {
    number: 0,
    color: [Color.NONE, Color.NONE],
    isRare: true
  };

  constructor(
    private readonly game: Game,
    rule: Rule[],
    eternals: Eternal[],
    bonus: Bonus,
    isFixedRule: boolean = false,
  ) {
    this.rule = rule;
    this.eternals = eternals;
    this.bonus = bonus;
    this.isFixedRule = isFixedRule;

    for (let i = 0; i < this.rule.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.rule[i], this.rule[j]] = [this.rule[j]!, this.rule[i]!];
    }
  }

  setCard(card: Card) {
    this.cards.push(card);
    this.currentCardVal = this.rule[0]!.caclCurrentVal(this.currentCardVal, card);
  }

  reCaclCurrentVal() {
    this.currentCardVal = {
      number: 0,
      color: [Color.NONE, Color.NONE],
      isRare: true
    };
    for (let card of this.cards) {
      this.currentCardVal = this.rule[0]!.caclCurrentVal(this.currentCardVal, card);
    }
  }

  handleFieldComplete(player: Player, fieldIdx: number) {
    if (this.cards.length + this.eternals.length != 7) {
      player.turnEnd();
      return;
    }
    if (this.eternals.length != 0) {
      player.changeState(new SelectFieldEternalState(fieldIdx));
    } else {
      this.bonus.get(player);
      if (fieldIdx == 1) {
        this.emptyField();
      }
    }
  }

  emptyField() {
    if (!this.isFixedRule) {
      let card: Card = this.rule.shift()!.card;
      this.game.discard.push(card);
    }
    this.game.discard.push(...this.cards);
    this.cards = [];
  }

  checkRule(card: Card): boolean {
    let baseRule: boolean = this.cards.length == 0 || card.isRare ||
      this.cards.at(-1)!.isRare ||
      this.cards.at(-1)!.number != card.number &&
      this.cards.at(-1)!.color![1] != card.color![0];

    return baseRule && (this.isTransToCamp || this.rule[0]!.checkValid(this.cards.length, this.currentCardVal, card));
  }

  releaseEternal(eternalIdx: number): Eternal {
    let eternal: Eternal = this.eternals[eternalIdx]!;
    eternal.release();
    this.eternals.splice(eternalIdx, 1);
    this.game.eternals.push(eternal);
    if (this.game.eternals.length == 9) {
      this.game.getStar[2] = true;
    }

    for (let card of this.cards) {
      this.game.discard.push(card);
    }
    this.cards = [];

    this.currentCardVal = {
      number: 0,
      color: [Color.NONE, Color.NONE],
      isRare: true
    };
    
    return eternal;
  }

  getData(): FieldData {
    let eternalsData: EternalData[] = [];
    for (let eternal of this.eternals) {
      eternalsData.push(eternal.getData());
    }
    return {
      rule: this.rule[0]!.card,
      cards: this.cards,
      eternals: eternalsData
    };
  }
}