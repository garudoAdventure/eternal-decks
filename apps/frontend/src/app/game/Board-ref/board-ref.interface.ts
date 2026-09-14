import { BoardRefType } from "./board-ref.enum";

export interface BoardRef {
  type: BoardRefType,
  index: number
}