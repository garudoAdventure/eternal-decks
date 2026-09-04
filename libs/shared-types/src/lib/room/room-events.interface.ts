export interface CreateRoomPayload {
  name: string;
  stage: number;
  maxPlayer: number;
}

export interface JoinRoomPayload {
  roomId: string;
  name: string;
}

export interface LeaveRoomPayload {
  roomId: string;
}