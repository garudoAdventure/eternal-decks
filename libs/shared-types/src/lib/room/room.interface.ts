export interface Player {
  socketId: string;
  name: string;
}

export enum RoomStatus {
  WAITING,
  GAME_START
}

export interface Room {
  id: string;
  name: string;
  status: RoomStatus;
  stage: number;
  maxPlayer: number;
  players: Player[];
}