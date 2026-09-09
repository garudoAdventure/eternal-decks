import { Color } from "./Color.enum"
import { CardData } from "./CardData.interface";

export interface PlayerData {
  id: string;
  name: string;
  color: Color;
  hand: CardData[];
  deckNum: number;
}