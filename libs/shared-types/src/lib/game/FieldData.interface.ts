import { CardData } from "./CardData.interface";
import { EternalData } from "./EternalData.interface";

export interface FieldData {
  rule: CardData;
  cards: CardData[];
	eternals: EternalData[]
}

export interface RiverData {
  cards: CardData[];
	rareCards: CardData[];
}