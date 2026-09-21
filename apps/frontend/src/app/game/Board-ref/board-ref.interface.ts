import { BoardRefType } from "./board-ref.enum";

export type BoardRef =
  | { type: BoardRefType.HAND; playerId: string; cardIdx: number }
  | { type: BoardRefType.FIELD; fieldIdx: number }
  | { type: BoardRefType.RIVER }
  | { type: BoardRefType.DISCARD };