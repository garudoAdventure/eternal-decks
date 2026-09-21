import { CardGroup, CardType } from "./Card.enum";
import { Color } from "./Color.enum"

export interface CardData {
  id: string;
  subID: number;
  group: CardGroup;
  type: CardType;
  isRotate: boolean;
  number?: number;
  color?: Color[];
}