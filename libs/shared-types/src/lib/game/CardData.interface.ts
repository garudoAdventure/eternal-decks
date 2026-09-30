import { CardGroup, CardType } from "./Card.enum";
import { Color } from "./Color.enum"

export interface CardData {
  id: string;
  subID: number;
  group: CardGroup;
  type: CardType;
  number: number;
  color: Color[];
  isRotate: boolean;
  isBack: boolean;
}