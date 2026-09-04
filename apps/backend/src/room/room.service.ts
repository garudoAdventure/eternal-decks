import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateRoomPayload, Room } from "@shared/types";

@Injectable()
export class RoomService {
  private allRooms = new Map<string, Room>();

  createRoom(param: CreateRoomPayload): Room {
    const room: Room = {
      id: randomUUID(),
      name: param.name,
      stage: param.stage,
      maxPlayer: param.maxPlayer,
      players: [],
    };
    this.allRooms.set(room.id, room);
    return room;
  }

  joinRoom(roomId: string, socketId: string, name: string): Room {
    const room = this.allRooms.get(roomId);
    if (!room) { throw new Error('房間不存在'); }
    // if (room.status !== 'waiting') { throw new Error('遊戲進行中'); }
    if (room.players.length >= room.maxPlayer) { throw new Error('房間已滿'); }
    room.players.push({ socketId, name });
    return room;
  }

  leaveRoom(roomId: string, socketId: string): Room | undefined {
    const room = this.allRooms.get(roomId);
    if(!room) { return undefined; }
    room.players = room.players.filter((p) => p.socketId != socketId);

    if(room.players.length == 0) {
      this.allRooms.delete(roomId);
      return undefined;
    }

    return room;
  }

  handleDisconnect(socketId: string): Room[] {
    const affected: Room[] = [];
    for (const room of this.allRooms.values()) {
      if (room.players.some((p) => p.socketId == socketId)) {
        const updated = this.leaveRoom(room.id, socketId);
        if (updated) { affected.push(updated); }
      }
    }
    return affected;
  }

  listRooms(): Room[] {
    return Array.from(this.allRooms.values());
  }

}