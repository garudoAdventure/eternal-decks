import { CardData } from "./CardData.interface"
import { PlayerData } from "./PlayerData.interface"
import { FieldData, RiverData } from "./FieldData.interface"
import { EternalData } from "./EternalData.interface"

export interface GameBoard {
  stars: boolean[];
  hearts: boolean[];
  jewels: boolean[];
  players: PlayerData[];
  fields: FieldData[];
  river: RiverData;
  eternals: EternalData[];
  discard: CardData[];
  starCard: CardData[];
  getStars: number[];
  campBonus: CardData | null;
  movedItemId: string[];
}