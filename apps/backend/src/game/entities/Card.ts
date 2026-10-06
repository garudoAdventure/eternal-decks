import { CardGroup, CardType, CardData, Color } from "@shared/types";

export class Card {
  id: string = '';
  subID: number = 0;
  group: CardGroup = CardGroup.NONE;
  type: CardType = CardType.NONE;
  number: number = 0;
  isRotate: boolean = false;
  isBack: boolean = false;
  private color: Color[] = [Color.NONE, Color.NONE];

  constructor(
    subID: number,
    group: CardGroup,
    type: CardType,
    number?: number,
    color?: Color[]
  ) {
    this.subID = subID;
    this.group = group;
    this.type = type;
    if (number) { this.number = number; }
    if (color) { this.color = color; }

    this.id = `${ group }-${ type }-${ subID }`;
  }

  get isRare(): boolean {
    return this.type == CardType.RARE ||
      this.group == CardGroup.MINOTAUR && this.type == CardType.ABILITY;
  }

  get isDoubleColor(): boolean {
    return this.color![0] != this.color![1];
  }

  get cardColor(): Color[] {
    return !this.isRotate ?
      [this.color[0], this.color[1]] : [this.color[1], this.color[0]];
  }

  rotate() {
    this.isRotate = !this.isRotate;
  }

  getData(): CardData {
    return {
      id: this.id,
      subID: this.subID,
      group: this.group,
      type: this.type,
      number: this.number,
      color: this.cardColor,
      isRotate: this.isRotate,
      isBack: this.isBack
    };
  }
}