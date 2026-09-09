import { CardGroup, CardType, CardData, Color } from "@shared/types";

export class Card {
  id: number = 0;
  group: CardGroup = CardGroup.NONE;
  type: CardType = CardType.NONE;
  number: number = 0;
  color: Color[] = [Color.NONE, Color.NONE];
  isRotate: boolean = false;

  constructor(
    id?: number,
    group?: CardGroup,
    type?: CardType,
    number?: number,
    color?: Color[]
  ) {
    if (id) { this.id = id; }
    if (group) { this.group = group };
    if (type) { this.type = type };
    if (number) { this.number = number; }
    if (color) { this.color = color; }
  }

  get isRare(): boolean {
    return this.type == CardType.RARE ||
      this.group == CardGroup.MINOTAUR && this.type == CardType.ABILITY;
  }

  get isDoubleColor(): boolean {
    return this.color![0] != this.color![1];
  }

  rotate() {
    this.isRotate = !this.isRotate;
    [this.color![0]!, this.color![1]!] = [this.color![1]!, this.color![0]!];
  }

  getData(): CardData {
    return {
      id: this.id,
      group: this.group,
      type: this.type,
      number: this.number,
      color: this.color,
      isRotate: this.isRotate
    };
  }
}