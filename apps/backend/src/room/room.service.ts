import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { randomUUID } from "crypto";
import { CreateRoomPayload, Room, RoomStatus } from "@shared/types";

@Injectable()
export class RoomService {
  private allRooms = new Map<string, Room>();

  handleDisconnect(playerId: string): Room[] {
    const affected: Room[] = [];
    for (const room of this.allRooms.values()) {
      if (room.players.some((p) => p.playerId == playerId)) {
        const updated = this.leaveRoom(room.id, playerId);
        if (updated) { affected.push(updated); }
      }
    }
    return affected;
  }

  createRoom(param: CreateRoomPayload): Room {
    const room: Room = {
      id: randomUUID(),
      name: param.name,
      status: RoomStatus.WAITING,
      stage: param.stage,
      maxPlayer: param.maxPlayer,
      players: [],
    };
    this.allRooms.set(room.id, room);
    return room;
  }

  joinRoom(roomId: string, client: Socket): Room {
    const room = this.allRooms.get(roomId);
    if (!room) { throw new Error('房間不存在'); }
    if (room.status !== RoomStatus.WAITING) { throw new Error('遊戲進行中'); }
    if (room.players.length >= room.maxPlayer) { throw new Error('房間已滿'); }
    
    room.players.push({ 
      playerId: client.data.playerId,
      name: client.data.playerName,
      socketId: client.id,
    });
    return room;
  }

  leaveRoom(roomId: string, playerId: string): Room | undefined {
    const room = this.allRooms.get(roomId);
    if(!room) { return undefined; }
    room.players = room.players.filter((p) => p.playerId != playerId);

    if(room.players.length == 0) {
      this.allRooms.delete(roomId);
      return undefined;
    }
    return room;
  }

  listRooms(): Room[] {
    return Array.from(this.allRooms.values());
  }
}