import { CardData } from "./CardData.interface";

export interface PlayCardAnimationEvent {
  playerId: string;
  cardIdx: number;
  fieldIdx: number;
  card: CardData;
}